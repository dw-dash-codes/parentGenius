import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import homeBanner from "../assets/home_banner.jpg";
import bookImg from "../assets/book_img.png";

const DEFAULT_AMAZON_BOOKS = [
  {
    id: "amz-1",
    title: "The Whole-Brain Child",
    desc: "12 Revolutionary Strategies to Nurture Your Child's Developing Mind.",
    price: "$ 18.99",
    oldPrice: "$ 24.99",
    image: bookImg,
    category: "amazon",
  },
  {
    id: "amz-2",
    title: "Good Inside: A Guide to Becoming the Parent You Want to Be",
    desc: "Practical strategies for parenting and emotional connection.",
    price: "$ 22.50",
    oldPrice: "$ 28.00",
    image: bookImg,
    category: "amazon",
  },
  {
    id: "amz-3",
    title: "No-Drama Discipline",
    desc: "The Whole-Brain Way to Calm the Chaos and Nurture Your Child's Mind.",
    price: "$ 16.95",
    oldPrice: "$ 21.00",
    image: bookImg,
    category: "amazon",
  },
];

const DEFAULT_AFFILIATE_BOOKS = [
  {
    id: "aff-1",
    title: "How to Talk So Kids Will Listen & Listen So Kids Will Talk",
    desc: "The ultimate parenting masterclass on clear communication.",
    price: "$ 15.49",
    oldPrice: "$ 19.99",
    image: bookImg,
    category: "affiliate",
  },
  {
    id: "aff-2",
    title: "Peaceful Parent, Happy Kids",
    desc: "How to Stop Yelling and Start Connecting with your children.",
    price: "$ 17.20",
    oldPrice: "$ 22.00",
    image: bookImg,
    category: "affiliate",
  },
  {
    id: "aff-3",
    title: "The Explosive Child",
    desc: "A New Approach for Understanding and Parenting Easily Frustrated Kids.",
    price: "$ 19.99",
    oldPrice: "$ 25.00",
    image: bookImg,
    category: "affiliate",
  },
];

export default function Resources() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [amazonBooks, setAmazonBooks] = useState(DEFAULT_AMAZON_BOOKS);
  const [affiliateBooks, setAffiliateBooks] = useState(DEFAULT_AFFILIATE_BOOKS);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch("${import.meta.env.VITE_API_BASE_URL}/api/resources");
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            const dynamicAmazon = data.filter((item) => item.category === "amazon");
            const dynamicAffiliate = data.filter((item) => item.category === "affiliate");

            if (dynamicAmazon.length > 0) {
              setAmazonBooks([...dynamicAmazon, ...DEFAULT_AMAZON_BOOKS]);
            }
            if (dynamicAffiliate.length > 0) {
              setAffiliateBooks([...dynamicAffiliate, ...DEFAULT_AFFILIATE_BOOKS]);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchResources();
  }, []);

  const filterBooks = (books) =>
    books.filter(
      (b) =>
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        (b.desc && b.desc.toLowerCase().includes(search.toLowerCase()))
    );

  const BookCard = ({ book }) => {
    const bookId = book._id || book.id;
    return (
      <div
        onClick={() => navigate(`/resources/${bookId}`)}
        className="flex gap-4 p-3 rounded-xl cursor-pointer ring-1 ring-transparent transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:ring-accent-400 hover:bg-brand-50 bg-white"
      >
        <img
          src={book.image || bookImg}
          alt={book.title}
          className="w-24 h-36 rounded-lg object-cover shrink-0"
        />
        <div className="flex flex-col justify-between flex-1">
          <div>
            <h4 className="font-semibold text-sm mb-1 text-ink-900 line-clamp-1">{book.title}</h4>
            <p className="text-xs text-ink-500 mb-2 line-clamp-2">{book.desc}</p>
          </div>
          <div>
            <p className="text-sm mb-3">
              <span className="font-bold text-ink-900">{book.price}</span>{" "}
              {book.oldPrice && (
                <span className="text-ink-500 line-through text-xs ml-1">
                  {book.oldPrice}
                </span>
              )}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                alert(`Added "${book.title}" to basket!`);
              }}
              className="h-9 px-4 rounded-full bg-accent-500 text-white text-xs font-medium inline-flex items-center gap-1.5 self-start transition-colors hover:bg-accent-600 cursor-pointer"
            >
              <FaCartShopping size={11} /> Add to basket
            </button>
          </div>
        </div>
      </div>
    );
  };

  const amazonResults = filterBooks(amazonBooks);
  const affiliateResults = filterBooks(affiliateBooks);

  return (
    <div>
      <section className="relative overflow-hidden bg-brand-500 text-white text-center px-6 py-16 sm:py-20">
        <img
          src={homeBanner}
          alt=""
          className="absolute inset-0 w-full h-auto object-cover opacity-20"
        />
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 py-10">Resources</h1>

        <p className="italic max-w-2xl mx-auto text-white/90 text-xl font-medium">
          A collection of carefully selected resources, including books and
          guides, to support parents in effective parenting and help children in
          their learning and development journey.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-6 pt-10">
        <div className="relative max-w-md mx-auto">
          <FaSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-500"
            size={16}
          />
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
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-ink-900">
          Books (Order from Amazon)
        </h2>
        {amazonResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {amazonResults.map((book) => (
              <BookCard key={book._id || book.id} book={book} />
            ))}
          </div>
        ) : (
          <p className="text-ink-500">No books match your search.</p>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-ink-900">
          Books (Affiliate links)
        </h2>
        {affiliateResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {affiliateResults.map((book) => (
              <BookCard key={book._id || book.id} book={book} />
            ))}
          </div>
        ) : (
          <p className="text-ink-500">No books match your search.</p>
        )}
      </section>
    </div>
  );
}