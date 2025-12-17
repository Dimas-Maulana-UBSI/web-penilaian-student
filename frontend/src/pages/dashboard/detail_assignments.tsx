import React, { useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Assignment } from "../../types/assignment";
import { Sidebar } from "../../components/ui/sidebar";
import { StudentGradedCard } from "../../components/ui/card";
import { Send } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { UpdateAssignment } from "../../services/assignments";

interface GradeFormData {
  nilai: number;
  komentar: string;
}

const GradePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const assignment = location.state?.assignment as Assignment | undefined;

  const [requirementsText, setRequirementsText] = useState("");
  const [requirements, setRequirements] = useState<
    { name: string; checked: boolean }[]
  >([]);
  const [formData, setFormData] = useState<GradeFormData>({
    nilai: assignment?.nilai ?? 0,
    komentar: assignment?.comment ?? "",
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { id, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    },
    []
  );

  const handleGenerateReq = useCallback(() => {
    const reqs = requirementsText
      .split(",")
      .map((r) => r.trim())
      .filter((r) => r.length > 0)
      .map((r) => ({
        name: r,
        checked: false,
      }));

    if (reqs.length === 0) {
      alert("Requirement tidak boleh kosong");
      return;
    }

    setRequirements(reqs);
  }, [requirementsText]);

  const toggleChecklist = useCallback((index: number) => {
    setRequirements((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );
  }, []);

  const handleSubmitGrade = useCallback(async () => {
    if (!formData.nilai || !formData.komentar) {
      alert("Please fill in both nilai & komentar");
      return;
    }

    const nilaiNum = Number(formData.nilai);
    if (nilaiNum < 0 || nilaiNum > 100) {
      alert("Nilai harus 0 - 100");
      return;
    }

    if (!assignment) return;

    const updatedData: Assignment = {
      ...assignment,
      nilai: nilaiNum,
      comment: formData.komentar.trim(),
      status: "graded",
      requirements,
    };

    try {
      await UpdateAssignment(updatedData);
      alert("Grade submitted successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update grade!");
    }
  }, [formData, assignment, requirements, navigate]);

  if (!assignment) {
    return (
      <div className="flex min-h-screen bg-[#F4F8FD]">
        <Sidebar link={[]} />
        <div className="flex-1 flex items-center justify-center">
          <p>No assignment found</p>
        </div>
      </div>
    );
  }

  const isFormValid = formData.nilai > 0 && formData.komentar.length > 0;

  return (
    <div className="flex min-h-screen bg-[#F4F8FD]">
      <Sidebar link={[]} />

      <div className="content flex flex-1 justify-center">
        <div className="left flex flex-col justify-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-sm font-medium mb-3 
                      bg-gray-200 hover:bg-gray-300 text-black
                      px-3 py-2 rounded-xl transition-all m-3"
          >
            ← Back to Dashboard
          </button>

          <StudentGradedCard assignment={assignment} />

          <div className="m-3 mt-6">
            <p className="font-semibold mb-1">Masukan Requirement</p>

            <textarea
              placeholder="Pisahkan dengan koma"
              value={requirementsText}
              onChange={(e) => setRequirementsText(e.target.value)}
              className="border-2 border-black/40 rounded-xl p-4 bg-white/95 h-20 w-full"
            />

            <Button
              type="button"
              onClick={handleGenerateReq}
              className="mt-2 bg-blue-600 text-white hover:bg-blue-700 w-full"
            >
              Generate Requirement
            </Button>

            {requirements.length > 0 && (
              <div className="mt-4 p-4 rounded-xl bg-white space-y-2 shadow">
                <p className="text-sm font-semibold">Checklist:</p>

                {requirements.map((req, index) => (
                  <label
                    key={index}
                    className="flex gap-2 items-center text-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={req.checked}
                      onChange={() => toggleChecklist(index)}
                    />
                    {req.name}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="right w-[250px] flex justify-center">
          <div className="m-3 bg-white rounded-2xl shadow-2xl p-6">
            <p className="text-2xl font-bold mb-10">Grade Assignment</p>

            <div className="mb-10">
              <label className="font-semibold text-sm">Nilai (0-100)</label>
              <Input
                type="number"
                id="nilai"
                onChange={handleInputChange}
                defaultValue={assignment.nilai}
                placeholder="Masukkan nilai"
                className="mt-1 border-2 rounded w-full"
              />
            </div>

            <div className="mb-10">
              <label className="font-semibold text-sm">Komentar</label>
              <textarea
                id="komentar"
                onChange={handleInputChange}
                value={formData.komentar}
                placeholder="Komentar untuk student..."
                className="border-2 rounded-xl w-full h-40 p-4"
              />
            </div>

            <Button
              onClick={handleSubmitGrade}
              disabled={!isFormValid}
              className={`w-full px-6 py-3 rounded-xl font-bold flex gap-2 items-center justify-center ${
                isFormValid
                  ? "bg-black text-white hover:bg-gray-900"
                  : "bg-black/30 text-white/60 cursor-not-allowed"
              }`}
            >
              <Send size={18} />
              Submit Grade
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradePage;
