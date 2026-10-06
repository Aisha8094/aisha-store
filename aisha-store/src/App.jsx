import { useState } from "react";

const products = [
  { id: 1, name: "Ladies Kurta - Pink", price: 2500, img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400" },
  { id: 2, name: "Jewellery Set - Gold", price: 3900, img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400" },
  { id: 3, name: "Hand Bag - Pink", price: 4200, img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400" },
  { id: 4, name: "Khussa Shoes", price: 1850, img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400" },
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const addToCart = (p) => setCart([...cart, p]);
  const total = cart.reduce((s, i) => s + i.price, 0);

  const orderWhatsApp = () => {
    const text = `Salam Aisha Store!\nMujhe ye order karna hai:\n${cart.map(c=>`- ${c.name} Rs.${c.price}`).join("\n")}\nTotal: Rs.${total}`;
    window.open(`https://wa.me/923000000000?text=${encodeURIComponent(text)}`, "_blank");
  };

  const orderEmail = async () => {
    setLoading(true);
    const res = await fetch("https://formsubmit.co/ajax/mushtaqayesha339@gmail.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        Order: cart.map(c=> c.name).join(", "),
        Total: `Rs. ${total}`,
        _subject: `NEW ORDER - Rs.${total} - Aisha Store`,
        _captcha: "false",
        _template: "table"
      })
    });
    setLoading(false);
    if(res.ok){
      alert("MashaAllah! Order bhej diya gaya. Aapko email par confirmation ayega ❤️");
      setCart([]);
    } else {
      alert("Error, dobara koshish karein");
    }
  };

  return (
    <div className="bg-pink-50 min-h-screen font-sans pb-24">
      <header className="bg-white shadow p-4 flex justify-between sticky top-0 z-10">
        <h1 className="font-bold text-xl text-pink-600">Aisha Store ✨</h1>
        <div className="bg-black text-white px-4 py-1 rounded-full text-sm">Cart {cart.length} - Rs.{total}</div>
      </header>

      <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map(p => (
          <div key={p.id} className="bg-white rounded-2xl shadow p-2">
            <img src={p.img} className="h-40 w-full object-cover rounded-xl" />
            <h2 className="font-semibold mt-2 text-sm">{p.name}</h2>
            <p className="text-pink-600 font-bold">Rs. {p.price}</p>
            <button onClick={() => addToCart(p)} className="w-full mt-2 bg-black text-white py-2 rounded-xl text-sm">Add to Cart</button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 flex gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
          <button onClick={orderEmail} disabled={loading} className="flex-1 border-2 border-pink-600 text-pink-600 py-3 rounded-xl font-bold">
            {loading ? "Bhej rahe hain..." : "📧 Email Order"}
          </button>
          <button onClick={orderWhatsApp} className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold">WhatsApp Order</button>
        </div>
      )}
    </div>
  );
}