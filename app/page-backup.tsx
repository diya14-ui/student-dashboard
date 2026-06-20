import Sidebar from "../component/Sidebar";

export default function Home() {
  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <div className="grid grid-cols-4 gap-4">
        <Sidebar />

        <div className="col-span-3 bg-white rounded-2xl p-6 shadow-md">
          <h1 className="text-3xl font-bold">
            Dashboard Content
          </h1>
        </div>
      </div>
    </main>
  );
}