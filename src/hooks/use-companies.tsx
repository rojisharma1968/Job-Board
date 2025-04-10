
import { useState, useEffect } from "react";
import { Company } from "@/types";
import companiesData from "@/data/companies.json";

export const useCompanies = () => {
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState<Company[]>([]);
  
  useEffect(() => {
    // Simulate API call delay
    setLoading(true);
    
    const timer = setTimeout(() => {
      setCompanies(companiesData);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  return { companies, loading };
};

export const useCompany = (id: string) => {
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState<Company | null>(null);
  
  useEffect(() => {
    setLoading(true);
    
    const timer = setTimeout(() => {
      const foundCompany = companiesData.find(company => company.id === id) || null;
      setCompany(foundCompany);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  return { company, loading };
};
