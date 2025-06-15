import React, { useState } from 'react';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';

function Analyser() {
  const [jd, setJd] = useState('');
  const [resume, setResume] = useState(null);
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jd || !resume) {
      alert('Please provide both Job Description and Resume');
      return;
    }

    const formData = new FormData();
    formData.append('jd', jd);
    formData.append('resume', resume);

    try {
      const res = await axios.post(`${USER_API_END_POINT}/analyse`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(res.data.result);
    } catch (err) {
      console.error(err);
      alert('Error analyzing resume');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">ATS Resume Analyzer</h1>
      <textarea
        className="w-full border p-2 mb-4"
        rows="6"
        placeholder="Paste the Job Description here"
        value={jd}
        onChange={(e) => setJd(e.target.value)}
      />
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setResume(e.target.files[0])}
        className="mb-4"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
      {result && (() => {
        let parsedResult;
        try {
          const cleanResult = result.replace(/```json|```/g, '').trim();
          parsedResult = JSON.parse(cleanResult);
        } catch (err) {
          console.error("Failed to parse result:", err);
          return (
            <div className="mt-6 p-4 border rounded bg-red-100 text-red-700">
              Error parsing response. Please try again.
            </div>
          );
        }

        return (
          <div className="mt-6 p-4 border rounded bg-gray-50 space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Analysis Result</h3>

            <div>
              <p className="font-medium text-gray-700">JD Match:</p>
              <p className="text-blue-600 font-bold text-xl">{parsedResult["JD Match"]}</p>
            </div>

            <div>
              <p className="font-medium text-gray-700">Missing Keywords:</p>
              {parsedResult["MissingKeywords"]?.length > 0 ? (
                <ul className="list-disc list-inside text-sm text-red-700">
                  {parsedResult["MissingKeywords"].map((keyword, index) => (
                    <li key={index}>{keyword}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-green-700">No major missing keywords.</p>
              )}
            </div>
            
            <div>
              <p className="font-medium text-gray-700">Improvement Suggestions:</p>
              {parsedResult["ImprovementSuggestions"]?.length > 0 ? (
                <ul className="list-disc list-inside text-sm text-yellow-700">
                  {parsedResult["ImprovementSuggestions"].map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-green-700">Resume looks well-optimized.</p>
              )}
            </div>

            <div>
              <p className="font-medium text-gray-700">Soft Skills Gap:</p>
              {parsedResult["SoftSkillsGap"]?.length > 0 ? (
                <ul className="list-disc list-inside text-sm text-purple-700">
                  {parsedResult["SoftSkillsGap"].map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-green-700">Soft skills seem adequately covered.</p>
              )}
            </div>
          </div>
        );
      })()}

    </div>
  );
}

export default Analyser;
