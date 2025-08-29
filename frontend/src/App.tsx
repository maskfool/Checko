import { useState } from "react";

export default function App() {
  const [task, setTask] = useState<"chaicode" | "twitter" | "gmail" | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    if (!task) return;
    setLoading(true);

    try {
      if (task === "chaicode") {
        await fetch("http://localhost:8787/api/chaicode/signup", { method: "POST" });
      }

      if (task === "twitter") {
        if (!input.trim()) return;
        await fetch("http://localhost:8787/api/twitter/post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: input }),
        });
        setInput("");
      }

      if (task === "gmail") {
        if (!input.trim()) return;
        await fetch("http://localhost:8787/api/gmail/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: "js00geek@gmail.com",
            subject: "Quick update",
            body: input,
          }),
        });
        setInput("");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-dvh w-dvw overflow-hidden bg-black text-white font-sans">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(1200px 800px at 15% 20%, #1b1b2f 0%, rgba(0,0,0,0) 60%)," +
            "radial-gradient(1000px 700px at 85% 35%, #1a1f3b 0%, rgba(0,0,0,0) 55%)," +
            "radial-gradient(900px 600px at 50% 80%, #141414 0%, rgba(0,0,0,0) 45%)",
        }}
      />
      <StarField />

      <div className="relative z-10 mx-auto flex h-full max-w-3xl flex-col items-center justify-center gap-6 px-4">
        {/* Welcome message */}
        <h1 className="text-center text-5xl font-bold tracking-tight text-white">
          Welcome to <span className="text-blue-400">Checko 🍵</span>
        </h1>

        {/* input */}
        {(task === "twitter" || task === "gmail") && (
          <input
            className="w-full rounded-full border border-white/25 bg-white/5 px-6 py-4 text-lg text-white outline-none backdrop-blur-md transition focus:border-white/50"
            type="text"
            placeholder={
              task === "twitter"
                ? "What should I post on Twitter?"
                : "Write your email body…"
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleRun()}
            disabled={loading}
          />
        )}

        {task === "chaicode" && (
          <button
            onClick={handleRun}
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-full border border-white px-8 py-3 font-medium text-white transition hover:bg-white/10 disabled:opacity-50"
          >
            {loading && <Spinner />}
            {loading ? "Signup in progress…" : "Run Signup Flow"}
          </button>
        )}

        {/* task buttons */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <TaskButton
            active={task === "chaicode"}
            label={
              loading && task === "chaicode"
                ? "Chaicode (running…)"
                : "Chaicode Signup"
            }
            onClick={() => !loading && setTask("chaicode")}
          />
          <TaskButton
            active={task === "twitter"}
            label={
              loading && task === "twitter"
                ? "Twitter (posting…)"
                : "Twitter Post"
            }
            onClick={() => !loading && setTask("twitter")}
          />
          <TaskButton
            active={task === "gmail"}
            label={
              loading && task === "gmail"
                ? "Gmail (sending…)"
                : "Gmail Send"
            }
            onClick={() => !loading && setTask("gmail")}
          />
          {(task === "twitter" || task === "gmail") && (
            <button
              onClick={handleRun}
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-full border border-white px-6 py-2 font-medium text-white transition hover:bg-white/10 disabled:opacity-50"
            >
              {loading && <Spinner />}
              {loading ? "Processing…" : "Submit"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function TaskButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-6 py-2 font-medium transition ${
        active
          ? "border-white bg-white/10 text-white"
          : "border-white text-white hover:bg-white/10"
      }`}
    >
      {label}
    </button>
  );
}

function Spinner() {
  return (
    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
  );
}

function StarField() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.9) 99%, rgba(255,255,255,0) 100%)," +
            "radial-gradient(1px 1px at 30% 80%, rgba(255,255,255,0.8) 99%, rgba(255,255,255,0) 100%)," +
            "radial-gradient(1px 1px at 70% 30%, rgba(255,255,255,0.7) 99%, rgba(255,255,255,0) 100%)," +
            "radial-gradient(1px 1px at 90% 60%, rgba(255,255,255,0.85) 99%, rgba(255,255,255,0) 100%)," +
            "radial-gradient(1px 1px at 50% 50%, rgba(255,255,255,0.75) 99%, rgba(255,255,255,0) 100%)",
          animation: "drift1 60s linear infinite",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 15% 35%, rgba(255,255,255,0.7) 99%, rgba(255,255,255,0) 100%)," +
            "radial-gradient(1px 1px at 45% 15%, rgba(255,255,255,0.6) 99%, rgba(255,255,255,0) 100%)," +
            "radial-gradient(1px 1px at 65% 65%, rgba(255,255,255,0.65) 99%, rgba(255,255,255,0) 100%)," +
            "radial-gradient(1px 1px at 85% 25%, rgba(255,255,255,0.6) 99%, rgba(255,255,255,0) 100%)," +
            "radial-gradient(1px 1px at 25% 75%, rgba(255,255,255,0.6) 99%, rgba(255,255,255,0) 100%)",
          animation: "drift2 90s linear infinite",
        }}
      />
      <style>{`
        @keyframes drift1 {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        @keyframes drift2 {
          0% { transform: translateX(0px); }
          50% { transform: translateX(-25px); }
          100% { transform: translateX(0px); }
        }
      `}</style>
    </>
  );
}