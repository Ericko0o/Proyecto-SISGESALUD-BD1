import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema({
  patientDni: String,
  entries: [
    {
      type: { type: String }, // "consulta", "diagnostico", "receta", "resultado", etc.
      date: Date,
      doctor: String,
      notes: String,
      fileUrl: String,       // en caso de PDFs
    }
  ]
});

export default mongoose.model("PatientHistory", HistorySchema);
