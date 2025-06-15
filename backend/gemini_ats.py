import google.generativeai as genai
import os
import sys
import PyPDF2 as pdf
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# List and print available models
models = genai.list_models()

def input_pdf_text(file_path):
    with open(file_path, 'rb') as f:
        reader = pdf.PdfReader(f)
        text = ''
        for page in reader.pages:
            text += page.extract_text()
    return text

def get_gemini_response(resume_text, jd):
    try:
        prompt = f"""
        You are a powerful ATS resume analyzer that helps candidates improve their resume.

        Your tasks:
        1. Compare the resume with the job description.
        2. Give a JD Match percentage.
        3. Identify Missing Keywords from the JD not present in the resume.
        4. Suggest specific improvements to increase the match.
        5. Optionally, point out missing soft skills if any are listed in the JD but not in the resume.

        Output in this strict JSON format:
        {{
            "JD Match": "XX%",
            "MissingKeywords": ["..."],
            "ImprovementSuggestions": ["..."],
            "SoftSkillsGap": ["..."]
        }}

        Resume:
        {resume_text}

        Job Description:
        {jd}
        """
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        import traceback
        traceback.print_exc()
        return f"Error: {str(e)}"

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python gemini_ats.py <resume_path> <job_description>")
        sys.exit(1)
    resume_path = sys.argv[1]
    jd = sys.argv[2]
    resume_text = input_pdf_text(resume_path)
    result = get_gemini_response(resume_text, jd)
    print(result)
