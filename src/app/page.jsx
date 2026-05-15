export default function Home() {
  return (
    <div className="flex w-full flex-col items-center bg-gray-50 p-4 sm:p-6">
      <h1 className="mb-6 text-center text-3xl font-extrabold text-blue-600 sm:mb-8 sm:text-5xl">
        Stock Managing Portal
      </h1>

      <img
        src="https://i.pinimg.com/736x/c6/7c/c1/c67cc114fc289a3eacc442da873053b2.jpg"
        alt="medical"
        className="mb-6 max-h-96 w-full max-w-lg rounded-xl object-cover shadow-lg sm:mb-8"
      />

      <p className="max-w-lg text-center text-base font-light text-gray-700 sm:text-xl">
        Easily manage your <span className="font-semibold text-blue-600">MRNs</span>, 
        track <span className="italic">batches</span>, and monitor 
        <span className="underline decoration-blue-200"> item history</span> all in one place.
      </p>
    </div>
  );
}
