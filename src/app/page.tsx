"use client";

import { useState } from "react";
import { NumericFormat } from "react-number-format";

export default function Home() {
  const [income, setIncome] = useState("");
  const [tax2024, setTax2024] = useState<number | null>(null);
  const [tax2025, setTax2025] = useState<number | null>(null);
  const [difference, setDifference] = useState<number | null>(null);

  const standardDeduction = 75000;

  // ✅ Tax Calculation for New Regime FY 2024-25
  const calculateTax2024 = (grossIncome: number) => {
    const taxableIncome = grossIncome - standardDeduction;
    let taxAmount = 0;

    if (taxableIncome <= 300000) {
      taxAmount = 0;
    } else if (taxableIncome <= 700000) {
      taxAmount = (taxableIncome - 300000) * 0.05;
    } else if (taxableIncome <= 1000000) {
      taxAmount = 20000 + (taxableIncome - 700000) * 0.10;
    } else if (taxableIncome <= 1200000) {
      taxAmount = 50000 + (taxableIncome - 1000000) * 0.15;
    } else if (taxableIncome <= 1500000) {
      taxAmount = 80000 + (taxableIncome - 1200000) * 0.20;
    } else {
      taxAmount = 140000 + (taxableIncome - 1500000) * 0.30;
    }

    return taxAmount;
  };

  // ✅ Tax Calculation for New Regime FY 2025-26
  const calculateTax2025 = (grossIncome: number) => {
    const taxableIncome = grossIncome - standardDeduction;
    let taxAmount = 0;

    if (taxableIncome <= 400000) {
      taxAmount = 0;
    } else if (taxableIncome <= 800000) {
      taxAmount = (taxableIncome - 400000) * 0.05;
    } else if (taxableIncome <= 1200000) {
      taxAmount = 20000 + (taxableIncome - 800000) * 0.10;
    } else if (taxableIncome <= 1600000) {
      taxAmount = 60000 + (taxableIncome - 1200000) * 0.15;
    } else if (taxableIncome <= 2000000) {
      taxAmount = 120000 + (taxableIncome - 1600000) * 0.20;
    } else if (taxableIncome <= 2400000) {
      taxAmount = 200000 + (taxableIncome - 2000000) * 0.25;
    } else {
      taxAmount = 300000 + (taxableIncome - 2400000) * 0.30;
    }

    return taxAmount;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const annualIncome = parseFloat(income.replace(/,/g, ""));
    if (!isNaN(annualIncome)) {
      const calculatedTax2024 = calculateTax2024(annualIncome);
      const calculatedTax2025 = calculateTax2025(annualIncome);
      setTax2024(calculatedTax2024);
      setTax2025(calculatedTax2025);
      setDifference(calculatedTax2024 - calculatedTax2025);
    } else {
      setTax2024(null);
      setTax2025(null);
      setDifference(null);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg border border-gray-300">
        <h1 className="text-3xl font-bold text-center mb-4 text-green-700">
          Income Tax Calculator
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="income" className="block font-medium text-black">
              Annual Income (₹):
            </label>
            <NumericFormat
              id="income"
              value={income}
              onValueChange={(values) => setIncome(values.value)}
              thousandSeparator=","
              thousandsGroupStyle="lakh"
              prefix="₹"
              className="mt-1 w-full border-gray-500 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600 px-3 py-2 text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:opacity-80 transition"
          >
            Calculate Tax
          </button>
        </form>

        {/* Output Section */}
        {tax2024 !== null && tax2025 !== null && difference !== null && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-green-700 text-center mb-3">
              📢 Tax Comparison (New Regime)
            </h2>
            <div className="overflow-hidden border border-gray-300 rounded-md">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-300 bg-gray-200">
                    <th className="p-3 text-black">Year</th>
                    <th className="p-3 text-black text-right">Tax Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-300">
                    <td className="p-3 text-black">FY 2024-25</td>
                    <td className="p-3 text-black text-right">
                      ₹
                      <NumericFormat
                        value={tax2024}
                        displayType="text"
                        thousandSeparator=","
                        thousandsGroupStyle="lakh"
                      />
                    </td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="p-3 text-black">FY 2025-26</td>
                    <td className="p-3 text-black text-right">
                      ₹
                      <NumericFormat
                        value={tax2025}
                        displayType="text"
                        thousandSeparator=","
                        thousandsGroupStyle="lakh"
                      />
                    </td>
                  </tr>
                  <tr className="bg-green-100">
                    <td className="p-3 font-bold text-green-700">Difference</td>
                    <td className="p-3 font-bold text-right text-green-700">
                      ₹
                      <NumericFormat
                        value={Math.abs(difference)}
                        displayType="text"
                        thousandSeparator=","
                        thousandsGroupStyle="lakh"
                      />{" "}
                      {difference > 0 ? "(Less Tax in 2025)" : "(Less Tax in 2024)"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 text-center mt-3">
              *difference means you save tax in FY 2025-26!*
            </p>
          </div>
        )}

        {/* Trademark */}
        <p className="text-xs text-gray-600 text-center mt-6">
          Made with ❤️ from Cupcake Corp
        </p>
      </div>
    </div>
  );
}
