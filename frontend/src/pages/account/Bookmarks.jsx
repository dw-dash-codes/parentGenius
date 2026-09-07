import { useState, useEffect } from "react";
import { FaBookmark, FaStar } from "react-icons/fa6";
import homeBanner from "../../assets/home_banner.jpg";

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        if (!token) return;

        const response = await fetch("${import.meta.env.VITE_API_BASE_URL}/api/users/bookmarks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBookmarks(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  const toggleBookmark = async (id) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/bookmarks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setBookmarks((prev) => prev.filter((item) => item._id !== id && item.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-accent-500 text-white pt-28 pb-20 px-6 min-h-[780px] flex flex-col items-center">
        <img
          src={homeBanner}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-accent-500/95 via-green-600/85 to-accent-500/95" />

        <div className="relative max-w-3xl mx-auto w-full flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-10 tracking-wide">
            Bookmarks
          </h1>

          {loading ? (
            <p className="text-white text-center text-lg mt-10">Loading bookmarks...</p>
          ) : bookmarks.length === 0 ? (
            <p className="text-white/80 text-center text-base mt-10">No bookmarks found.</p>
          ) : (
            <div className="w-full space-y-4">
              {bookmarks.map((item) => (
                <div
                  key={item._id || item.id}
                  className="bg-white rounded-3xl p-3 sm:p-4 shadow-md flex items-center justify-between gap-4 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 sm:w-32 sm:h-28 rounded-2xl object-cover shrink-0"
                    />

                    <div className="min-w-0 py-1">
                      <span className="text-xs sm:text-sm font-bold text-accent-500 block mb-1">
                        {item.category}
                      </span>

                      <h3 className="text-base sm:text-xl font-extrabold text-ink-900 truncate mb-1">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-ink-300 truncate mb-2">
                        {item.description}
                      </p>

                      <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-ink-900">
                        <FaStar className="text-yellow-400" size={15} />
                        <span>{item.rating}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleBookmark(item._id || item.id)}
                    className="p-3 text-brand-500 transition-transform active:scale-90 hover:opacity-80 shrink-0 self-start sm:self-center cursor-pointer"
                  >
                    <FaBookmark size={20} className="text-brand-500" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}