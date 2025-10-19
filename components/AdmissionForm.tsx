import React, { useState } from 'react';
import Section from './Section';
// FIX: Using GoogleGenAI according to the new guidelines
import { GoogleGenAI } from '@google/genai';

const AdmissionForm: React.FC = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    applyingForClass: '',
    reason: '',
  });
  
  const [files, setFiles] = useState<{ [key: string]: File[] }>({});

  const [isProofreading, setIsProofreading] = useState(false);
  const [proofreadReason, setProofreadReason] = useState('');
  const [formStatus, setFormStatus] = useState('');

  const documentFields = [
    { id: 'studentAadhar', label: "Student's Aadhar Card" },
    { id: 'parentAadhar', label: "Parent's Aadhar Card" },
    { id: 'studentPhoto', label: "Student's Passport Size Photo" },
    { id: 'birthCertificate', label: 'Birth Certificate' },
    { id: 'studentPassbook', label: "Student's Bank Passbook Photo" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: selectedFiles } = e.target;
    if (selectedFiles && selectedFiles.length > 0) {
      setFiles(prevFiles => ({
        ...prevFiles,
        [name]: Array.from(selectedFiles)
      }));
    }
  };

  const handleRemoveFile = (fileName: string) => {
    setFiles(prevFiles => {
      const newFiles = { ...prevFiles };
      delete newFiles[fileName];
      return newFiles;
    });
     // Also clear the file input value
    const input = document.getElementById(fileName) as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  };


  const handleProofread = async () => {
    if (!formData.reason) {
      alert('Please enter a reason for applying before proofreading.');
      return;
    }
    setIsProofreading(true);
    setProofreadReason('');
    try {
      // FIX: Initialize GoogleGenAI with named apiKey parameter
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // FIX: Use ai.models.generateContent to generate content
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Proofread and correct the following text for grammar and spelling, keeping the original meaning intact:\n\n"${formData.reason}"`
      });
      
      // FIX: Extract text directly from response.text property
      const proofreadText = response.text;

      if (proofreadText) {
        setProofreadReason(proofreadText);
      }
    } catch (error) {
      console.error('Error proofreading with AI:', error);
      alert('Failed to proofread. Please try again.');
    } finally {
      setIsProofreading(false);
    }
  };

  const useSuggestion = () => {
    setFormData(prevState => ({
      ...prevState,
      reason: proofreadReason,
    }));
    setProofreadReason('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const documentStatus = documentFields.map(field => {
        const file = files[field.id] && files[field.id].length > 0;
        return `- ${field.label}: ${file ? '✔️ Uploaded' : '❌ Not Uploaded'}`;
    }).join('\n');

    const message = `*✨ Online Admission Inquiry - Guru Nanak High School ✨*

*Student Details:*
- Student's Name: *${formData.studentName}*
- Parent/Guardian's Name: *${formData.parentName}*
- Class Applying For: *${formData.applyingForClass}*

*Contact Information:*
- Email: *${formData.email}*
- Phone: *${formData.phone}*

*Reason for Applying (Optional):*
${formData.reason || 'Not provided'}

*Uploaded Documents Status:*
${documentStatus}

---
_This message was auto-generated from the school website._`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '9263737680';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setFormStatus('Your inquiry has been prepared for WhatsApp. Please complete the submission in the new tab that opened.');
    setFormData({
      studentName: '',
      parentName: '',
      email: '',
      phone: '',
      applyingForClass: '',
      reason: '',
    });
    
    // Reset file inputs
    Object.keys(files).forEach(id => {
        const input = document.getElementById(id) as HTMLInputElement;
        if (input) {
            input.value = '';
        }
    });
    setFiles({});
    setProofreadReason('');
  };

  return (
    <Section title="Online Admission Inquiry">
      <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
        Fill out the form below to inquire about admissions. Our team will contact you shortly.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Student's Full Name</label>
            <input type="text" name="studentName" id="studentName" value={formData.studentName} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Parent/Guardian's Name</label>
            <input type="text" name="parentName" id="parentName" value={formData.parentName} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
            <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>
        <div>
          <label htmlFor="applyingForClass" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Class Applying For</label>
          <select name="applyingForClass" id="applyingForClass" value={formData.applyingForClass} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <option value="">Select a class</option>
            <option>Nursery</option>
            <option>LKG</option>
            <option>UKG</option>
            {[...Array(10)].map((_, i) => <option key={i + 1} value={`Class ${i + 1}`}>Class {i + 1}</option>)}
          </select>
        </div>
        
        {/* Document Upload Section */}
        <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Required Documents</h3>
            {documentFields.map(({ id, label }) => (
                 <div key={id}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
                    <div className="mt-1 flex items-center">
                        <label htmlFor={id} className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                             <svg className="w-5 h-5 mr-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Upload File</span>
                            <input id={id} name={id} type="file" required className="sr-only" onChange={handleFileChange} accept="image/*,.pdf"/>
                        </label>
                        {files[id] && files[id].length > 0 && (
                            <div className="ml-4 flex items-center text-sm">
                                <span className="text-gray-600 dark:text-gray-300">{files[id][0].name}</span>
                                <button type="button" onClick={() => handleRemoveFile(id)} className="ml-2 p-1 text-red-600 hover:text-red-800 focus:outline-none" aria-label={`Remove ${files[id][0].name}`}>
                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>


        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Reason for Applying (Optional)</label>
          <textarea name="reason" id="reason" rows={4} value={formData.reason} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
          <div className="mt-2 flex justify-end">
            <button type="button" onClick={handleProofread} disabled={isProofreading || !formData.reason} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed">
              {isProofreading ? 'Checking...' : 'Proofread with AI ✨'}
            </button>
          </div>
        </div>

        {proofreadReason && (
          <div className="p-4 bg-blue-50 dark:bg-gray-700 border border-blue-200 dark:border-gray-600 rounded-md">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">AI Suggestion:</p>
            <p className="mt-2 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{proofreadReason}</p>
            <div className="mt-3 flex gap-4">
              <button type="button" onClick={useSuggestion} className="px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700">Use this suggestion</button>
              <button type="button" onClick={() => setProofreadReason('')} className="px-3 py-1 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">Dismiss</button>
            </div>
          </div>
        )}

        <div>
          <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Submit Inquiry
          </button>
        </div>
        {formStatus && <p className="mt-4 text-center text-green-600 dark:text-green-400">{formStatus}</p>}
      </form>
    </Section>
  );
};

export default AdmissionForm;