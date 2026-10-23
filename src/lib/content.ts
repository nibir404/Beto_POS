// All copy and demo data for the landing page, taken from the Paper design.
// Figures are demo data from the Beto POS walkthrough — replace before launch.

export type Store = {
  name: string;
  type: "Showroom" | "Franchise";
  sales: string;
  counters: string;
  staff: string;
  status: "ok" | "warn";
};

export const stores: Store[] = [
  { name: "Bogura Showroom", type: "Showroom", sales: "৳1,84,200", counters: "3 / 3", staff: "Nadia, Sumon, Rafi", status: "ok" },
  { name: "Rangpur Franchise", type: "Franchise", sales: "৳96,450", counters: "2 / 2", staff: "Mitu · offline 14:10–14:52", status: "warn" },
  { name: "Dhanmondi Showroom", type: "Showroom", sales: "৳2,31,900", counters: "4 / 4", staff: "Arif, Lima, Tanvir, Joya", status: "ok" },
  { name: "Sylhet Franchise", type: "Franchise", sales: "৳71,080", counters: "2 / 2", staff: "Habib, Rumana", status: "ok" },
  { name: "Gulshan Showroom", type: "Showroom", sales: "৳2,08,750", counters: "4 / 4", staff: "Sabbir, Nupur, Rony, Tania", status: "ok" },
  { name: "Rajshahi Franchise", type: "Franchise", sales: "৳88,300", counters: "2 / 2", staff: "Kamal, Shila", status: "ok" },
  { name: "Chattogram Showroom", type: "Showroom", sales: "৳1,96,400", counters: "3 / 3", staff: "Ayesha, Faruk, Mim", status: "ok" },
  { name: "Khulna Franchise", type: "Franchise", sales: "৳64,920", counters: "1 / 2", staff: "Jamal · counter 2 not opened", status: "warn" },
];

export const alerts = [
  { text: "Discount of 22% approved by supervisor PIN", meta: "BOGURA · COUNTER 2 · 11:48" },
  { text: "2 patties short on challan DC-2291", meta: "BOGURA · RECEIVING · 07:41" },
  { text: "Counter offline 42 min — 12 bills synced", meta: "RANGPUR · COUNTER 1 · 14:52" },
];

export type Scene = {
  id: string;
  time: string;
  title: string;
  beat: string;
  slate: string;
  bn: string;
  en: string;
  pose: "standing" | "pointing" | "thinking" | "sleeping";
};

export const scenes: Scene[] = [
  { id: "01", time: "07:30", title: "The challan arrives", beat: "Two patties short. Beto POS flags it before anyone signs.", slate: "BOGURA SHOWROOM · 07:30 · DELIVERY", bn: "চালান এল। দুটো প্যাটি কম।", en: "The delivery came in two patties short.", pose: "standing" },
  { id: "02", time: "11:42", title: "A bill is born", beat: "৳590, split bKash and cash. Receipt on WhatsApp.", slate: "BOGURA SHOWROOM · 11:42 · COUNTER 2", bn: "৳৫৯০ — বিকাশে ৪০০, নগদে ১৯০।", en: "৳590 — ৳400 by bKash, ৳190 in cash.", pose: "pointing" },
  { id: "03", time: "14:10", title: "The lights go out", beat: "Rangpur keeps selling. 12 bills wait in Beto POS's offline queue.", slate: "RANGPUR FRANCHISE · 14:10 · POWER CUT", bn: "বিদ্যুৎ চলে গেল। বিক্রি থামেনি।", en: "The power went out. The selling didn't.", pose: "pointing" },
  { id: "04", time: "14:52", title: "Back online", beat: "Every bill reaches head office. None lost.", slate: "RANGPUR FRANCHISE · 14:52 · SYNC", bn: "সংযোগ ফিরল। ১২টা বিল পৌঁছে গেল।", en: "Back online. All 12 bills arrived.", pose: "thinking" },
  { id: "05", time: "22:00", title: "The day closes", beat: "All counters closed. Beto finally sleeps.", slate: "HEAD OFFICE · 22:00 · DAY CLOSE", bn: "সব কাউন্টার বন্ধ। হিসাব মিলেছে।", en: "Every counter closed. The numbers match.", pose: "sleeping" },
];

export type Channel = {
  n: number;
  name: string;
  group: string;
  ai?: boolean;
  screen: { title: string; meta: string; big?: string; rows: [string, string][]; cta?: string };
};

export const channels: Channel[] = [
  { n: 1, group: "Head office", name: "Stores & staff roles", screen: { title: "Stores", meta: "27 stores · 184 staff", rows: [["Bogura Showroom", "Manager · 3 staff"], ["Rangpur Franchise", "Owner · 2 staff"], ["Dhanmondi Showroom", "Manager · 4 staff"]] } },
  { n: 2, group: "Head office", name: "Staff PINs", screen: { title: "Staff PINs", meta: "Counter 2 · Bogura", big: "• • • •", rows: [["Nadia", "Cashier"], ["Sumon", "Supervisor"]], cta: "RESET PIN" } },
  { n: 3, group: "Head office", name: "One price list", screen: { title: "Price list v214", meta: "Live in 27 stores", rows: [["Black Forest 1kg", "৳950"], ["Chicken Patty", "৳60"], ["Rasmalai 500g", "৳260"]], cta: "PUBLISH TO ALL" } },
  { n: 4, group: "Head office", name: "Pair a counter with one code", screen: { title: "Pair a new counter", meta: "Rangpur Franchise", big: "47K29", rows: [["Counter 3", "expires 9:42"]] } },
  { n: 5, group: "Delivery", name: "Challan, line by line", screen: { title: "Challan DC-2291", meta: "Depot → Bogura", big: "48 / 50", rows: [["Chicken Patty", "18 / 20"], ["Sandwich Bread", "30 / 30"]] } },
  { n: 6, group: "Delivery", name: "Short & damaged items", screen: { title: "Exceptions", meta: "Challan DC-2291", rows: [["Short", "2 · Patty"], ["Damaged", "1 · Bread"], ["Note", "Driver signed"]] } },
  { n: 7, group: "Delivery", name: "Batches & expiry dates", screen: { title: "Batches", meta: "Received 07:41", rows: [["Patty · B-1180", "exp 24 Oct"], ["Rasmalai · B-0942", "exp 26 Oct"], ["Bread · B-2207", "exp 25 Oct"]] } },
  { n: 8, group: "Counter", name: "One-tap billing & barcode", screen: { title: "New bill", meta: "Counter 2 · Nadia", rows: [["Chicken Patty × 4", "৳240"], ["Sandwich Bread", "৳90"], ["Rasmalai 500g", "৳260"]], cta: "TOTAL ৳590" } },
  { n: 9, group: "Counter", name: "Discount limits & supervisor PIN", screen: { title: "Discount 15%", meta: "Above cashier limit (10%)", big: "PIN", rows: [["Requested by", "Nadia"], ["Approve", "Supervisor"]] } },
  { n: 10, group: "Counter", name: "Split payments", screen: { title: "Take payment", meta: "Bill #0391", big: "৳590", rows: [["bKash", "৳400"], ["Cash", "৳190"]], cta: "CHARGE ৳590" } },
  { n: 11, group: "Counter", name: "Receipt by SMS & WhatsApp", screen: { title: "Send receipt", meta: "Bill #0391 · ৳590", rows: [["WhatsApp", "+880 17•• ••42"], ["SMS", "Sent ✓"]] } },
  { n: 12, group: "Counter", name: "Held bills", screen: { title: "Held bills", meta: "Counter 2", rows: [["#0389 · Table 4", "৳1,240"], ["#0392 · Walk-in", "৳180"]], cta: "RESUME" } },
  { n: 13, group: "Counter", name: "Customer orders with advance", screen: { title: "Birthday cake order", meta: "Pickup 19:30", rows: [["Black Forest 2kg", "৳1,900"], ["Advance paid", "৳1,000"], ["Balance", "৳900"]] } },
  { n: 14, group: "When things go wrong", name: "Offline selling & sync", screen: { title: "Offline", meta: "Rangpur · Counter 1", big: "12", rows: [["Bills queued", "since 14:10"], ["Status", "selling normally"]] } },
  { n: 15, group: "When things go wrong", name: "Returns at the price paid", screen: { title: "Return", meta: "Bill #0377", rows: [["Rasmalai 500g", "৳245 paid"], ["Refund", "৳245"], ["Already refunded", "no"]], cta: "CONFIRM REFUND" } },
  { n: 16, group: "Closing", name: "X-report & cash count", screen: { title: "Cash count", meta: "Bogura · 21:40", big: "−৳20", rows: [["Expected", "৳48,320"], ["Counted", "৳48,300"]] } },
  { n: 17, group: "Closing", name: "Stock count & tomorrow's demand", screen: { title: "Tomorrow's demand", meta: "To the central depot", rows: [["Black Forest 1kg", "+8"], ["Chicken Patty", "+40"], ["Sandwich Bread", "+25"]], cta: "SEND DEMAND" } },
  { n: 18, group: "Closing", name: "Day close waits for every counter", screen: { title: "Day close", meta: "Bogura Showroom", big: "3 / 3", rows: [["Counter 1", "closed"], ["Counter 2", "closed"], ["Counter 3", "closed"]] } },
  { n: 19, group: "Oversight", name: "Every store on one page", screen: { title: "All stores today", meta: "61 / 62 counters live", big: "৳41.6L", rows: [["Top", "Dhanmondi"], ["Alerts", "3 open"]] } },
  { n: 20, group: "Oversight", name: "Franchise settlement", screen: { title: "Rangpur settlement", meta: "This week", rows: [["Sales", "৳4,12,600"], ["Commission", "−৳41,260"], ["Cash sent", "৳3,50,000"]] } },
  { n: 21, group: "Oversight", name: "Ask Beto POS AI", ai: true, screen: { title: "Beto POS AI", meta: "Ask in Bangla or English", rows: [["You", "Kon store pichiye?"], ["Beto", "Rangpur, −18%. Power cut."]] } },
];

export const channelGroups = ["Head office", "Delivery", "Counter", "When things go wrong", "Closing", "Oversight"];

export const days = [
  { time: "07:30 · Store manager", title: "Delivery, checked line by line", body: "Shorts, damages and expiry, line by line." },
  { time: "11:00 · Cashier", title: "Bill fast, approve safely", body: "Split payments. Supervisor PIN for big discounts." },
  { time: "14:10 · Power cut", title: "Offline? Keep selling.", body: "Bills queue offline and sync later." },
  { time: "22:00 · Manager", title: "A day close that waits", body: "Closes only when every counter has." },
];

export const products = [
  { name: "Black Forest 1kg", price: 950, tint: "#FFF1CC" },
  { name: "Chicken Patty", price: 60, tint: "#FFE3CC", stock: 6 },
  { name: "Sandwich Bread", price: 90, tint: "#F3F2EF" },
  { name: "Rasmalai 500g", price: 260, tint: "#FFE0D6" },
  { name: "Chocolate Pastry", price: 120, tint: "#EDE7FF" },
  { name: "Butter Cookies", price: 220, tint: "#F3F2EF" },
  { name: "Mishti Doi", price: 150, tint: "#FFF1CC" },
  { name: "Vegetable Roll", price: 50, tint: "#E3F3E6" },
];

export const rules = [
  { title: "One price list for every store", tag: "Head office" },
  { title: "Pair a new counter with one code", tag: "Setup" },
  { title: "Staff roles, PINs and discount limits", tag: "Access" },
  { title: "Refunds at the price paid, never twice", tag: "Returns" },
  { title: "Customer orders with advance, balance on pickup", tag: "Orders" },
  { title: "Franchise settlement, commission and cash sent", tag: "Franchise" },
];

export const aiQA = [
  {
    q: "Which store is behind today?",
    a: "Rangpur is 18% behind last Tuesday — a 42-minute power cut at 14:10. All 12 offline bills have synced.",
    chart: [24, 32, 28, 40, 36, 44, 56],
  },
  {
    q: "Explain Bogura's cash difference",
    a: "Bogura counted ৳48,300 against ৳48,320 expected. The ৳20 gap matches a coin refund on bill #0377 at 18:12.",
  },
  {
    q: "Draft tomorrow's demand",
    a: "Drafted for 27 stores: +8 Black Forest for Rangpur (6 cake orders tonight), +40 patties for Bogura. Send to the depot?",
  },
];

export const rollout = [
  { week: "Week 1", title: "Set up head office", body: "Import products and the price list. Create stores, roles and staff PINs." },
  { week: "Week 2", title: "Pilot one showroom", body: "Pair its counters with a code. We train cashiers on site, in Bangla." },
  { week: "Week 3", title: "Add a franchise", body: "Settlement and commission switched on. The owner gets their own view." },
  { week: "Week 4+", title: "Roll out the chain", body: "Same setup, copied store by store. Head office watches each one go live." },
];

export const faqs = [
  { q: "What happens when the internet goes down?", a: "Counters keep billing. Bills wait in a queue on the device and sync on their own when the connection is back. Head office sees how long each counter was offline." },
  { q: "Do we need new hardware?", a: "Beto POS runs on SUNMI handhelds, Android tablets and phones, and in any web browser. Most chains start on the devices they already have." },
  { q: "Can we move our products and prices from the old POS?", a: "Yes. We import your product list and prices during week one, then publish one price list to every store." },
  { q: "How do franchise owners see their numbers?", a: "Each owner gets their own view of sales, settlement with head office, commission and cash sent — and nothing from other stores." },
  { q: "Who can give discounts or void a bill?", a: "Head office sets the limits per role. Anything above a cashier's limit needs a supervisor PIN, and every void asks for confirmation and is logged." },
  { q: "Is there support in Bangla?", a: "Yes. Training, the counter app and Beto POS AI all work in Bangla, and our team supports you during setup and after go-live." },
];
