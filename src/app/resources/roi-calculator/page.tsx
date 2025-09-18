"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calculator,
  TrendingUp,
  DollarSign,
  Clock,
  Users,
  AlertTriangle,
  Download,
  Share2,
  Info,
  ChevronRight
} from "lucide-react";
import jsPDF from 'jspdf';

interface ROIInputs {
  // Company Info
  companyName: string;
  industry: string;
  employees: number;
  
  // Current State
  avgSalary: number;
  hoursPerWeekInMeetings: number;
  projectDelayRate: number;
  errorRate: number;
  avgErrorCost: number;
  manualProcessHours: number;
  
  // AI Implementation
  implementationCost: number;
  annualLicenseCost: number;
  trainingCost: number;
  
  // Expected Improvements
  meetingReduction: number;
  delayReduction: number;
  errorReduction: number;
  automationSavings: number;
  
  // Timeline
  implementationMonths: number;
  analysisYears: number;
}

const defaultInputs: ROIInputs = {
  companyName: '',
  industry: '',
  employees: 1000,
  avgSalary: 75000,
  hoursPerWeekInMeetings: 15,
  projectDelayRate: 30,
  errorRate: 5,
  avgErrorCost: 10000,
  manualProcessHours: 40,
  implementationCost: 150000,
  annualLicenseCost: 60000,
  trainingCost: 30000,
  meetingReduction: 40,
  delayReduction: 50,
  errorReduction: 60,
  automationSavings: 70,
  implementationMonths: 3,
  analysisYears: 3,
};

interface ROIResults {
  totalCost: number;
  totalSavings: number;
  netBenefit: number;
  roi: number;
  paybackMonths: number;
  yearlyBreakdown: {
    year: number;
    cost: number;
    savings: number;
    cumulative: number;
  }[];
  savingsBreakdown: {
    category: string;
    annual: number;
    percentage: number;
  }[];
}

function calculateROI(inputs: ROIInputs): ROIResults {
  // Calculate annual savings
  const hourlyRate = inputs.avgSalary / 2080; // Assuming 2080 work hours per year
  
  // Meeting time savings
  const meetingHoursSaved = inputs.employees * inputs.hoursPerWeekInMeetings * 52 * (inputs.meetingReduction / 100);
  const meetingSavings = meetingHoursSaved * hourlyRate;
  
  // Project delay savings (assuming delays cost 2x normal rate)
  const delayHours = inputs.employees * 100 * (inputs.projectDelayRate / 100); // Assume 100 hours per employee at risk
  const delaySavings = delayHours * hourlyRate * 2 * (inputs.delayReduction / 100);
  
  // Error reduction savings
  const annualErrors = inputs.employees * (inputs.errorRate / 100) * 12; // Monthly error rate
  const errorSavings = annualErrors * inputs.avgErrorCost * (inputs.errorReduction / 100);
  
  // Automation savings
  const automationHoursSaved = inputs.manualProcessHours * 52 * inputs.employees * (inputs.automationSavings / 100);
  const automationSavingsAmount = automationHoursSaved * hourlyRate;
  
  const totalAnnualSavings = meetingSavings + delaySavings + errorSavings + automationSavingsAmount;
  
  // Calculate costs
  const firstYearCost = inputs.implementationCost + inputs.trainingCost + inputs.annualLicenseCost;
  const subsequentYearCost = inputs.annualLicenseCost;
  
  // Calculate yearly breakdown
  const yearlyBreakdown = [];
  let cumulativeBenefit = 0;
  
  for (let year = 1; year <= inputs.analysisYears; year++) {
    const cost = year === 1 ? firstYearCost : subsequentYearCost;
    const savings = year === 1 
      ? totalAnnualSavings * (12 - inputs.implementationMonths) / 12 // Partial first year
      : totalAnnualSavings;
    cumulativeBenefit += savings - cost;
    
    yearlyBreakdown.push({
      year,
      cost,
      savings,
      cumulative: cumulativeBenefit,
    });
  }
  
  // Calculate totals
  const totalCost = yearlyBreakdown.reduce((sum, year) => sum + year.cost, 0);
  const totalSavings = yearlyBreakdown.reduce((sum, year) => sum + year.savings, 0);
  const netBenefit = totalSavings - totalCost;
  const roi = (netBenefit / totalCost) * 100;
  
  // Calculate payback period
  const monthlySavings = totalAnnualSavings / 12;
  const paybackMonths = Math.ceil(firstYearCost / monthlySavings);
  
  // Savings breakdown
  const savingsBreakdown = [
    {
      category: 'Meeting Time Reduction',
      annual: meetingSavings,
      percentage: (meetingSavings / totalAnnualSavings) * 100,
    },
    {
      category: 'Project Delay Prevention',
      annual: delaySavings,
      percentage: (delaySavings / totalAnnualSavings) * 100,
    },
    {
      category: 'Error Reduction',
      annual: errorSavings,
      percentage: (errorSavings / totalAnnualSavings) * 100,
    },
    {
      category: 'Process Automation',
      annual: automationSavingsAmount,
      percentage: (automationSavingsAmount / totalAnnualSavings) * 100,
    },
  ];
  
  return {
    totalCost,
    totalSavings,
    netBenefit,
    roi,
    paybackMonths,
    yearlyBreakdown,
    savingsBreakdown,
  };
}

export default function ROICalculatorPage() {
  const [inputs, setInputs] = useState<ROIInputs>(defaultInputs);
  const [results, setResults] = useState<ROIResults | null>(null);
  const [activeTab, setActiveTab] = useState('inputs');

  const handleCalculate = () => {
    const calculatedResults = calculateROI(inputs);
    setResults(calculatedResults);
    setActiveTab('results');
  };

  const handleInputChange = (field: keyof ROIInputs, value: string | number) => {
    setInputs(prev => ({
      ...prev,
      [field]: typeof prev[field] === 'number' ? Number(value) || 0 : value,
    }));
  };

  const generatePDF = () => {
    if (!results) return;

    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    
    // Header
    pdf.setFontSize(20);
    pdf.text('AI Transformation ROI Analysis', pageWidth / 2, 20, { align: 'center' });
    
    pdf.setFontSize(12);
    pdf.text(`Company: ${inputs.companyName || 'Your Company'}`, 20, 35);
    pdf.text(`Industry: ${inputs.industry || 'Your Industry'}`, 20, 42);
    pdf.text(`Analysis Period: ${inputs.analysisYears} years`, 20, 49);
    
    // Key Metrics
    pdf.setFontSize(16);
    pdf.text('Key Results', 20, 65);
    
    pdf.setFontSize(12);
    pdf.text(`Total Investment: $${results.totalCost.toLocaleString()}`, 20, 75);
    pdf.text(`Total Savings: $${results.totalSavings.toLocaleString()}`, 20, 82);
    pdf.text(`Net Benefit: $${results.netBenefit.toLocaleString()}`, 20, 89);
    pdf.text(`ROI: ${results.roi.toFixed(1)}%`, 20, 96);
    pdf.text(`Payback Period: ${results.paybackMonths} months`, 20, 103);
    
    // Savings Breakdown
    pdf.setFontSize(16);
    pdf.text('Annual Savings Breakdown', 20, 120);
    
    pdf.setFontSize(11);
    let yPosition = 130;
    results.savingsBreakdown.forEach(item => {
      pdf.text(
        `${item.category}: $${item.annual.toLocaleString()} (${item.percentage.toFixed(1)}%)`,
        20,
        yPosition
      );
      yPosition += 7;
    });
    
    // Footer
    pdf.setFontSize(10);
    pdf.text('Generated by Austin Mander AI ROI Calculator', pageWidth / 2, 280, { align: 'center' });
    pdf.text('austinmander.com', pageWidth / 2, 287, { align: 'center' });
    
    // Save the PDF
    pdf.save(`AI-ROI-Analysis-${inputs.companyName || 'Company'}.pdf`);
  };

  const shareResults = () => {
    if (!results) return;
    
    const shareText = `AI Transformation ROI Analysis:
- ROI: ${results.roi.toFixed(1)}%
- Payback: ${results.paybackMonths} months
- ${inputs.analysisYears}-year benefit: $${results.netBenefit.toLocaleString()}

Calculate your ROI: https://austinmander.com/resources/roi-calculator`;
    
    if (navigator.share) {
      navigator.share({
        title: 'AI ROI Analysis',
        text: shareText,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Results copied to clipboard!');
    }
  };

  return (
    <>
      <Navigation />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-12 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4">Free Tool</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-navy dark:text-white mb-4">
                AI Transformation ROI Calculator
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Calculate the real return on investment for your AI transformation initiatives. 
                Get a detailed breakdown of costs, savings, and payback period.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-teal" />
                  <span>Average ROI: 320%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-teal" />
                  <span>Payback: 6-12 months</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-teal" />
                  <span>Save $1M+ annually</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="inputs">Input Data</TabsTrigger>
                  <TabsTrigger value="results" disabled={!results}>
                    View Results {results && '✓'}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="inputs" className="space-y-8">
                  {/* Company Information */}
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Company Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input
                          id="companyName"
                          value={inputs.companyName}
                          onChange={(e) => handleInputChange('companyName', e.target.value)}
                          placeholder="Your Company"
                        />
                      </div>
                      <div>
                        <Label htmlFor="industry">Industry</Label>
                        <Input
                          id="industry"
                          value={inputs.industry}
                          onChange={(e) => handleInputChange('industry', e.target.value)}
                          placeholder="e.g., Financial Services"
                        />
                      </div>
                      <div>
                        <Label htmlFor="employees">Number of Employees</Label>
                        <Input
                          id="employees"
                          type="number"
                          value={inputs.employees}
                          onChange={(e) => handleInputChange('employees', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="avgSalary">Average Salary ($)</Label>
                        <Input
                          id="avgSalary"
                          type="number"
                          value={inputs.avgSalary}
                          onChange={(e) => handleInputChange('avgSalary', e.target.value)}
                        />
                      </div>
                    </div>
                  </Card>

                  {/* Current Challenges */}
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Current Challenges
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="hoursPerWeekInMeetings">
                          Hours/Week in Status Meetings (per person)
                        </Label>
                        <Input
                          id="hoursPerWeekInMeetings"
                          type="number"
                          value={inputs.hoursPerWeekInMeetings}
                          onChange={(e) => handleInputChange('hoursPerWeekInMeetings', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="projectDelayRate">
                          Project Delay Rate (%)
                        </Label>
                        <Input
                          id="projectDelayRate"
                          type="number"
                          value={inputs.projectDelayRate}
                          onChange={(e) => handleInputChange('projectDelayRate', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="errorRate">
                          Monthly Error Rate (%)
                        </Label>
                        <Input
                          id="errorRate"
                          type="number"
                          value={inputs.errorRate}
                          onChange={(e) => handleInputChange('errorRate', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="avgErrorCost">
                          Average Cost per Error ($)
                        </Label>
                        <Input
                          id="avgErrorCost"
                          type="number"
                          value={inputs.avgErrorCost}
                          onChange={(e) => handleInputChange('avgErrorCost', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="manualProcessHours">
                          Weekly Manual Process Hours (total)
                        </Label>
                        <Input
                          id="manualProcessHours"
                          type="number"
                          value={inputs.manualProcessHours}
                          onChange={(e) => handleInputChange('manualProcessHours', e.target.value)}
                        />
                      </div>
                    </div>
                  </Card>

                  {/* Investment */}
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      AI Investment
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="implementationCost">
                          Implementation Cost ($)
                        </Label>
                        <Input
                          id="implementationCost"
                          type="number"
                          value={inputs.implementationCost}
                          onChange={(e) => handleInputChange('implementationCost', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="annualLicenseCost">
                          Annual License Cost ($)
                        </Label>
                        <Input
                          id="annualLicenseCost"
                          type="number"
                          value={inputs.annualLicenseCost}
                          onChange={(e) => handleInputChange('annualLicenseCost', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="trainingCost">
                          Training Cost ($)
                        </Label>
                        <Input
                          id="trainingCost"
                          type="number"
                          value={inputs.trainingCost}
                          onChange={(e) => handleInputChange('trainingCost', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="implementationMonths">
                          Implementation Time (months)
                        </Label>
                        <Input
                          id="implementationMonths"
                          type="number"
                          value={inputs.implementationMonths}
                          onChange={(e) => handleInputChange('implementationMonths', e.target.value)}
                        />
                      </div>
                    </div>
                  </Card>

                  {/* Expected Improvements */}
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Expected Improvements
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="meetingReduction">
                          Meeting Time Reduction (%)
                        </Label>
                        <Input
                          id="meetingReduction"
                          type="number"
                          value={inputs.meetingReduction}
                          onChange={(e) => handleInputChange('meetingReduction', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="delayReduction">
                          Delay Reduction (%)
                        </Label>
                        <Input
                          id="delayReduction"
                          type="number"
                          value={inputs.delayReduction}
                          onChange={(e) => handleInputChange('delayReduction', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="errorReduction">
                          Error Reduction (%)
                        </Label>
                        <Input
                          id="errorReduction"
                          type="number"
                          value={inputs.errorReduction}
                          onChange={(e) => handleInputChange('errorReduction', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="automationSavings">
                          Process Automation (%)
                        </Label>
                        <Input
                          id="automationSavings"
                          type="number"
                          value={inputs.automationSavings}
                          onChange={(e) => handleInputChange('automationSavings', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="analysisYears">
                          Analysis Period (years)
                        </Label>
                        <Input
                          id="analysisYears"
                          type="number"
                          value={inputs.analysisYears}
                          onChange={(e) => handleInputChange('analysisYears', e.target.value)}
                          min="1"
                          max="5"
                        />
                      </div>
                    </div>
                  </Card>

                  <div className="flex justify-center">
                    <Button size="lg" onClick={handleCalculate} className="bg-teal hover:bg-teal/90">
                      <Calculator className="mr-2 h-5 w-5" />
                      Calculate ROI
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="results" className="space-y-8">
                  {results && (
                    <>
                      {/* Key Metrics */}
                      <div className="grid md:grid-cols-5 gap-4">
                        <Card className="p-6 text-center">
                          <p className="text-sm text-muted-foreground mb-2">Total Investment</p>
                          <p className="text-2xl font-bold text-navy dark:text-white">
                            ${results.totalCost.toLocaleString()}
                          </p>
                        </Card>
                        <Card className="p-6 text-center">
                          <p className="text-sm text-muted-foreground mb-2">Total Savings</p>
                          <p className="text-2xl font-bold text-teal">
                            ${results.totalSavings.toLocaleString()}
                          </p>
                        </Card>
                        <Card className="p-6 text-center">
                          <p className="text-sm text-muted-foreground mb-2">Net Benefit</p>
                          <p className="text-2xl font-bold text-teal">
                            ${results.netBenefit.toLocaleString()}
                          </p>
                        </Card>
                        <Card className="p-6 text-center border-teal">
                          <p className="text-sm text-muted-foreground mb-2">ROI</p>
                          <p className="text-2xl font-bold text-teal">
                            {results.roi.toFixed(1)}%
                          </p>
                        </Card>
                        <Card className="p-6 text-center">
                          <p className="text-sm text-muted-foreground mb-2">Payback Period</p>
                          <p className="text-2xl font-bold text-navy dark:text-white">
                            {results.paybackMonths} mo
                          </p>
                        </Card>
                      </div>

                      {/* Yearly Breakdown */}
                      <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Year-by-Year Analysis</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2">Year</th>
                                <th className="text-right py-2">Cost</th>
                                <th className="text-right py-2">Savings</th>
                                <th className="text-right py-2">Net Benefit</th>
                                <th className="text-right py-2">Cumulative</th>
                              </tr>
                            </thead>
                            <tbody>
                              {results.yearlyBreakdown.map((year) => (
                                <tr key={year.year} className="border-b">
                                  <td className="py-2">Year {year.year}</td>
                                  <td className="text-right py-2">
                                    ${year.cost.toLocaleString()}
                                  </td>
                                  <td className="text-right py-2">
                                    ${year.savings.toLocaleString()}
                                  </td>
                                  <td className="text-right py-2">
                                    <span className={year.savings - year.cost >= 0 ? 'text-teal' : 'text-red-500'}>
                                      ${(year.savings - year.cost).toLocaleString()}
                                    </span>
                                  </td>
                                  <td className="text-right py-2 font-semibold">
                                    <span className={year.cumulative >= 0 ? 'text-teal' : 'text-red-500'}>
                                      ${year.cumulative.toLocaleString()}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </Card>

                      {/* Savings Breakdown */}
                      <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Annual Savings Breakdown</h3>
                        <div className="space-y-4">
                          {results.savingsBreakdown.map((item, index) => (
                            <div key={index}>
                              <div className="flex justify-between mb-2">
                                <span className="text-sm">{item.category}</span>
                                <span className="text-sm font-semibold">
                                  ${item.annual.toLocaleString()} ({item.percentage.toFixed(0)}%)
                                </span>
                              </div>
                              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-teal rounded-full"
                                  style={{ width: `${item.percentage}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </Card>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-4 justify-center">
                        <Button onClick={generatePDF} variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF Report
                        </Button>
                        <Button onClick={shareResults} variant="outline">
                          <Share2 className="mr-2 h-4 w-4" />
                          Share Results
                        </Button>
                        <Button onClick={() => setActiveTab('inputs')} variant="outline">
                          Adjust Inputs
                        </Button>
                        <Button asChild className="bg-teal hover:bg-teal/90">
                          <a href="/book">
                            Discuss Results
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </>
                  )}
                </TabsContent>
              </Tabs>

              {/* Tips */}
              <Card className="p-6 mt-8 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                      How to Get Accurate Results
                    </h4>
                    <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                      <li>• Use actual salary data from your HR department</li>
                      <li>• Track current meeting time through calendar analysis</li>
                      <li>• Base error rates on historical incident data</li>
                      <li>• Use conservative estimates for improvements (40-60% is typical)</li>
                      <li>• Include all costs: software, hardware, training, and change management</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-slate-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-navy dark:text-white mb-4">
                Ready to Achieve These Results?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                This calculator shows what's possible. Let's discuss how to make it reality for your organisation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-teal hover:bg-teal/90">
                  <a href="/book">Book Free Consultation</a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="/change-radar">Learn About Change Radar</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}