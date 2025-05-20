import { useState, useEffect } from "react";
import sampleQuiz from "../data/quizData";
import Confetti from "react-confetti";
import useWindowSize from "../hooks/useWindowSize.js";
import { useContext } from "react";

function getRandomQuizzes(count) {
  const shuffled = [...sampleQuiz].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function QuizOfTheDay() {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const { width, height } = useWindowSize(); // for Confetti dimensions

  useEffect(() => {
    loadQuiz();
  }, []);

  const loadQuiz = () => {
    const today = new Date().toDateString();
    const stored = JSON.parse(localStorage.getItem("quizOfTheDay"));

    if (stored && stored.date === today) {
      setQuizzes(stored.quizzes);
    } else {
      const newQuizzes = getRandomQuizzes(3);
      localStorage.setItem(
        "quizOfTheDay",
        JSON.stringify({ date: today, quizzes: newQuizzes })
      );
      setQuizzes(newQuizzes);
    }

    // reset states
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    setFeedback("");
    setIsAnswered(false);
    setIsComplete(false);
  };

  const resetQuiz = () => {
    const newQuizzes = getRandomQuizzes(3);
    const today = new Date().toDateString();
    localStorage.setItem(
      "quizOfTheDay",
      JSON.stringify({ date: today, quizzes: newQuizzes })
    );
    setQuizzes(newQuizzes);
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    setFeedback("");
    setIsAnswered(false);
    setIsComplete(false);
  };

  const handleAnswer = (optionIndex) => {
    if (isAnswered) return;

    const currentQuiz = quizzes[currentQuizIndex];
    setSelectedOption(optionIndex);
    setIsAnswered(true);

    const correctAnswer = currentQuiz.answer;
    if (optionIndex === correctAnswer) {
      setFeedback("✅ Correct!");
    } else {
      setFeedback(
        `❌ Incorrect! Correct answer is "${currentQuiz.options[correctAnswer]}"`
      );
    }

    setTimeout(() => {
      if (currentQuizIndex < quizzes.length - 1) {
        setCurrentQuizIndex((prev) => prev + 1);
        setSelectedOption(null);
        setFeedback("");
        setIsAnswered(false);
      } else {
        setIsComplete(true);
      }
    }, 2000);
  };

  if (quizzes.length === 0) return null;

  return (
    <div className="w-full h-full p-10">
   <section className="w-full h-[80%] mt-16 px-6 md:px-12 py-10 rounded-2xl max-w-4xl mx-auto shadow-xl bg-gradient-to-br from-[#F8F9FC] to-[#E0E7FF] relative overflow-hidden">
  <h2 className="text-4xl font-extrabold mb-8 text-[#192A88] text-center">
    🧠 Quiz of the Day
  </h2>

  {isComplete && <Confetti width={width} height={height} />}

  {!isComplete ? (
    <div className="flex flex-col gap-6">
      <p className="text-xl font-semibold text-gray-800">
        {`${currentQuizIndex + 1}. ${quizzes[currentQuizIndex].question}`}
      </p>

      <div className="flex flex-col gap-4 ">
        {quizzes[currentQuizIndex].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            className={`px-5 py-3 border rounded-lg text-left font-medium transition-all duration-200 shadow-sm cursor-pointer ${
              isAnswered
                ? index === quizzes[currentQuizIndex].answer
                  ? "bg-green-200 border-green-600 text-green-800"
                  : index === selectedOption
                  ? "bg-red-200 border-red-600 text-red-800"
                  : "bg-white border-gray-300 text-gray-700"
                : "bg-white hover:bg-yellow-100 border border-gray-300 text-gray-800"
            }`}
            disabled={isAnswered}
          >
            {option}
          </button>
        ))}
      </div>

      {feedback && (
        <p className="mt-3 font-semibold text-base text-center text-indigo-800">
          {feedback}
        </p>
      )}
    </div>
  ) : (
    <div className="flex flex-col w-full h-full justify-center items-center gap-6 text-center">
      <p className="text-2xl font-bold text-green-700 animate-bounce">
        🎉 You've completed today's quiz!
      </p>
      <button
        onClick={resetQuiz}
        className="bg-[#192A88] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#101c63] transition duration-300 shadow-md"
      >
        🔁 Try Again
      </button>
    </div>
  )}
</section>
</div>
  );
}

export default QuizOfTheDay;
