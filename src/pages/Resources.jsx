import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import homeBanner from "../assets/home_banner.jpg";
import bookImg from "../assets/book_img.png";

const AMAZON_BOOKS = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  title: "The Time Has Come",
  desc: "Lindbergh's Pharmacy is an Athens, Georgia, institution...",
  price: "$ 27.89",
  oldPrice: "$ 30.99",
}));

const AFFILIATE_BOOKS = Array.from({ length: 6 }, (_, i) => ({
  id: i + 7,
  title: "The Time Has Come",
  desc: "Lindbergh's Pharmacy is an Athens, Georgia, institution...",
  price: "$ 27.89",
  oldPrice: "$ 30.99",
}));

export default function Resources() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filterBooks = (books) =>
    books.filter((b) => b.title.toLowerCase().includes(search.toLowerCase()));

  const BookCard = ({ book }) => (
    <div
      onClick={() => navigate(`/resources/${book.id}`)}
      className="flex gap-4 p-3 rounded-xl cursor-pointer ring-1 ring-transparent transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:ring-accent-400 hover:bg-brand-50"
    >
      <img src={bookImg} alt={book.title} className="w-24 h-36 rounded-lg object-cover shrink-0" />
      <div className="flex flex-col">
        <h4 className="font-semibold text-sm mb-1">{book.title}</h4>
        <p className="text-xs text-ink-500 mb-2">{book.desc}</p>
        <p className="text-sm mb-3">
          <span className="font-bold">{book.price}</span>{" "}
          <span className="text-ink-500 line-through text-xs">{book.oldPrice}</span>
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            alert("Added to basket!");
          }}
          className="mt-auto h-9 px-4 rounded-full bg-accent-500 text-white text-xs font-medium inline-flex items-center gap-1.5 self-start transition-colors hover:bg-accent-600"
        >
          <FaCartShopping size={11} /> Add to basket
        </button>
      </div>
    </div>
  );

  const amazonResults = filterBooks(AMAZON_BOOKS);
  const affiliateResults = filterBooks(AFFILIATE_BOOKS);

  return (
    <div>
      <section className="relative overflow-hidden bg-brand-500 text-white text-center px-6 py-16 sm:py-20">
        <img src={homeBanner} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 mt-8">Resources</h1>
          <p className="italic text-lg sm:text-xl text-white/90">
            A collection of carefully selected resources, including books and guides, to support parents in effective parenting and help children in their learning and development journey.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pt-10">
        <div className="relative max-w-md mx-auto">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-500" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search resources"
            className="w-full h-12 rounded-xl bg-ink-50 pl-11 pr-4 text-sm outline-none ring-1 ring-ink-100 focus:ring-brand-500"
          />
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-xl sm:text-2xl font-bold mb-6">Books (Order from Amazon)</h2>
        {amazonResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {amazonResults.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <p className="text-ink-500">No books match your search.</p>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-xl sm:text-2xl font-bold mb-6">Books (Affiliate links)</h2>
        {affiliateResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {affiliateResults.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <p className="text-ink-500">No books match your search.</p>
        )}
      </section>
    </div>
  );
}