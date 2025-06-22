export const LoadingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 flex items-center justify-center p-4 dark:from-gray-800 dark:via-gray-900 dark:to-black">
      <div className="flex flex-col items-center justify-center p-8 bg-base-100/70 backdrop-blur-sm rounded-3xl shadow-2xl">
        <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
        <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
