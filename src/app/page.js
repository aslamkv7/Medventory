export default function Home() {
  return (
    <div className="flex flex-col items-center bg-gray-50 p-6 w-full">
      <h1 className="text-5xl font-extrabold text-blue-600 mb-8 text-center">
        Stock Managing Portal
      </h1>

      <img
        src="https://i.pinimg.com/736x/c6/7c/c1/c67cc114fc289a3eacc442da873053b2.jpg"
        alt="medical"
        className="rounded-xl shadow-lg mb-8 max-h-96"
      />

      <p className="text-xl text-gray-700 font-light max-w-lg text-center">
        Easily manage your <span className="font-semibold text-blue-600">MRNs</span>, 
        track <span className="italic">batches</span>, and monitor 
        <span className="underline decoration-blue-200"> item history</span> all in one place.
      </p>
    </div>
  );
}
