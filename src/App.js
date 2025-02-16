import React, { useState } from "react";
import "./styles.css";

const questions = [
  {
    question: "Quando visiti un museo, cosa ti colpisce di più?",
    options: [
      {
        text: "La storia dietro le opere esposte.",
        category: "Riflessivo",
        image: "/riflessivo1.jpg",
      },
      {
        text: "La possibilità di toccare o interagire con alcune installazioni.",
        category: "Esperienziale",
        image: "/esperienziale1.jpg",
      },
      {
        text: "L'organizzazione dello spazio e il percorso espositivo.",
        category: "Pragmatico",
        image: "/pragmatico1.jpg",
      },
      {
        text: "Le spiegazioni dettagliate e i contenuti scientifici.",
        category: "Teorico",
        image: "/teorico1.jpg",
      },
    ],
  },
  {
    question: "Quale tra questi aspetti rende più interessante una mostra?",
    options: [
      {
        text: "Un tema profondo che mi fa riflettere.",
        category: "Riflessivo",
        image: "/riflessivo2.jpg",
      },
      {
        text: "Esperienze coinvolgenti e interattive.",
        category: "Esperienziale",
        image: "/esperienziale2.jpg",
      },
      {
        text: "Una chiara disposizione e facilità di orientamento.",
        category: "Pragmatico",
        image: "/pragmatico2.jpg",
      },
      {
        text: "Informazioni dettagliate e analisi approfondite.",
        category: "Teorico",
        image: "/teorico2.jpg",
      },
    ],
  },
  {
    question: "Come preferisci ricevere informazioni sulle opere?",
    options: [
      {
        text: "Attraverso spiegazioni che stimolino la riflessione.",
        category: "Riflessivo",
        image: "/riflessivo3.jpg",
      },
      {
        text: "Con video, realtà aumentata o installazioni immersive.",
        category: "Esperienziale",
        image: "/esperienziale3.jpg",
      },
      {
        text: "Con schede sintetiche e informazioni essenziali.",
        category: "Pragmatico",
        image: "/pragmatico3.jpg",
      },
      {
        text: "Con approfondimenti scientifici e tecnici.",
        category: "Teorico",
        image: "/teorico3.jpg",
      },
    ],
  },
  {
    question: "Cosa ti colpisce di più in una mostra temporanea?",
    options: [
      {
        text: "La capacità di stimolare riflessioni personali.",
        category: "Riflessivo",
        image: "/riflessivo4.jpg",
      },
      {
        text: "Le esperienze che mi fanno sentire parte dell'evento.",
        category: "Esperienziale",
        image: "/esperienziale4.jpg",
      },
      {
        text: "La chiarezza nella disposizione e nelle spiegazioni.",
        category: "Pragmatico",
        image: "/pragmatico4.jpg",
      },
      {
        text: "L'approfondimento delle teorie o dei temi trattati.",
        category: "Teorico",
        image: "/teorico4.jpg",
      },
    ],
  },
  {
    question: "Cosa cerchi di più in un museo?",
    options: [
      {
        text: "Un’esperienza che mi faccia riflettere e imparare qualcosa di nuovo.",
        category: "Riflessivo",
        image: "/riflessivo5.jpg",
      },
      {
        text: "Attività pratiche che mi facciano sentire parte dell’esposizione.",
        category: "Esperienziale",
        image: "/esperienziale5.jpg",
      },
      {
        text: "Un percorso ben strutturato e intuitivo.",
        category: "Pragmatico",
        image: "/pragmatico5.jpg",
      },
      {
        text: "Un approfondimento serio e accademico.",
        category: "Teorico",
        image: "/teorico5.jpg",
      },
    ],
  },
];

export default function App() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [category, setCategory] = useState(null);

  const handleAnswer = (option) => {
    setSelectedOption(option);
  };

  const nextQuestion = () => {
    if (selectedOption) {
      const newAnswers = [...answers, selectedOption.category];
      setAnswers(newAnswers);
      if (step < questions.length - 1) {
        setStep(step + 1);
        setSelectedOption(null);
      } else {
        const categoryCount = newAnswers.reduce((acc, category) => {
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});
        const mostCommonCategory = Object.keys(categoryCount).reduce((a, b) =>
          categoryCount[a] > categoryCount[b] ? a : b
        );
        setCategory(mostCommonCategory);
      }
    }
  };

  const prevQuestion = () => {
    if (step > 0) {
      setStep(step - 1);
      setSelectedOption(answers[step - 1] || null);
    }
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers([]);
    setSelectedOption(null);
    setCategory(null);
  };

  return (
    <div className="fancy-container">
      <h1 className="main-title">CHE TIPO SEI?</h1> {/* Titolo principale */}
      {!category ? (
        <>
          <p className="progress-text">
            Domanda {step + 1} di {questions.length}
          </p>

          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${((step + 1) / questions.length) * 100}%` }}
            ></div>
          </div>

          <h2 className="question-title">{questions[step].question}</h2>

          <div className="options">
            {questions[step].options.map((option, index) => (
              <button
                key={index}
                className={`fancy-button ${
                  selectedOption === option ? "selected" : ""
                }`}
                onClick={() => handleAnswer(option)}
              >
                <img src={option.image} alt="" className="option-image" />
                <span>{option.text}</span>
              </button>
            ))}
          </div>

          <div className="navigation-buttons">
            {step > 0 && (
              <button className="fancy-nav-button" onClick={prevQuestion}>
                Torna indietro
              </button>
            )}
            <button className="fancy-nav-button" onClick={nextQuestion}>
              Avanti
            </button>
          </div>
        </>
      ) : (
        <div className="result-container">
          <h2 className="result-title">
            Dalle tue risposte, il tuo profilo risulta essere quello di un{" "}
            <b>{category}</b>!
          </h2>
          <button className="fancy-reset" onClick={resetQuiz}>
            Ricomincia da capo
          </button>
        </div>
      )}
    </div>
  );
}
