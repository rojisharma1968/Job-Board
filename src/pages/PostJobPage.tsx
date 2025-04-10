
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import MainLayout from "@/components/layout/MainLayout";

const PostJobPage = () => {
  const navigate = useNavigate();
  const [isRemote, setIsRemote] = useState(false);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // In a real application, this would submit the form data to an API
    // For this mock version, we'll just show a success message
    toast({
      title: "Job Posted Successfully",
      description: "Your job has been posted and is now live.",
    });
    
    // Redirect to jobs page
    setTimeout(() => {
      navigate("/jobs");
    }, 1500);
  };
  
  return (
    <MainLayout>
      <div className="bg-gray-50 py-8 px-4 sm:px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a Job</h1>
            <p className="text-gray-600">Fill out the form below to create a new job listing</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <form onSubmit={handleSubmit}>
              {/* Job Details Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Details</h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="job-title">Job Title*</Label>
                    <Input 
                      id="job-title" 
                      placeholder="e.g. Frontend Developer"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="job-category">Job Category*</Label>
                      <Select required>
                        <SelectTrigger id="job-category">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="data-science">Data Science</SelectItem>
                          <SelectItem value="product">Product</SelectItem>
                          <SelectItem value="hr">Human Resources</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="employment-type">Employment Type*</Label>
                      <Select required>
                        <SelectTrigger id="employment-type">
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full-time</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Checkbox 
                        id="remote-position" 
                        checked={isRemote}
                        onCheckedChange={(checked) => setIsRemote(!!checked)}
                      />
                      <label
                        htmlFor="remote-position"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        This is a remote position
                      </label>
                    </div>
                    
                    {!isRemote && (
                      <div>
                        <Label htmlFor="job-location">Location*</Label>
                        <Input 
                          id="job-location" 
                          placeholder="e.g. San Francisco, CA"
                          required
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="experience-level">Experience Level*</Label>
                      <Select required>
                        <SelectTrigger id="experience-level">
                          <SelectValue placeholder="Select Level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="entry-level">Entry-level (0-2 years)</SelectItem>
                          <SelectItem value="mid-level">Mid-level (3-5 years)</SelectItem>
                          <SelectItem value="senior">Senior (5+ years)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="salary-range">Salary Range</Label>
                      <Input 
                        id="salary-range" 
                        placeholder="e.g. $80,000 - $100,000"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="job-description">Job Description*</Label>
                    <Textarea 
                      id="job-description" 
                      placeholder="Provide a detailed description of the job..."
                      className="h-32"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="responsibilities">Responsibilities*</Label>
                    <Textarea 
                      id="responsibilities" 
                      placeholder="List the main responsibilities of the role (one per line)..."
                      className="h-32"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="requirements">Requirements*</Label>
                    <Textarea 
                      id="requirements" 
                      placeholder="List the key requirements for the role (one per line)..."
                      className="h-32"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="skills">Required Skills*</Label>
                    <Input 
                      id="skills" 
                      placeholder="e.g. React, JavaScript, CSS (comma separated)"
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Company Details Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Company Details</h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="company-name">Company Name*</Label>
                    <Input 
                      id="company-name" 
                      placeholder="e.g. TechCorp"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company-website">Company Website</Label>
                      <Input 
                        id="company-website" 
                        placeholder="e.g. https://example.com"
                        type="url"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="company-logo">Company Logo URL</Label>
                      <Input 
                        id="company-logo" 
                        placeholder="e.g. https://example.com/logo.png"
                        type="url"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Details Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Details</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contact-name">Contact Name*</Label>
                      <Input 
                        id="contact-name" 
                        placeholder="e.g. John Doe"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="contact-email">Contact Email*</Label>
                      <Input 
                        id="contact-email" 
                        placeholder="e.g. john@example.com"
                        type="email"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="application-instructions">Application Instructions</Label>
                    <Textarea 
                      id="application-instructions" 
                      placeholder="Provide instructions for how candidates should apply..."
                      className="h-24"
                    />
                  </div>
                </div>
              </div>
              
              {/* Posting Options Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Posting Options</h2>
                
                <div className="space-y-4">
                  <div>
                    <Label>Posting Duration*</Label>
                    <RadioGroup defaultValue="30" className="mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="30" id="duration-30" />
                        <Label htmlFor="duration-30">30 days</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="60" id="duration-60" />
                        <Label htmlFor="duration-60">60 days</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="90" id="duration-90" />
                        <Label htmlFor="duration-90">90 days</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
              
              {/* Terms and Conditions */}
              <div className="mb-8">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the terms and conditions and confirm that this job posting complies with all applicable laws and regulations.
                  </label>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="flex justify-end">
                <Button type="submit" className="bg-job-primary hover:bg-job-dark">
                  Post Job
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PostJobPage;
