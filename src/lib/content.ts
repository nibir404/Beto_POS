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
  pose: "waving" | "pointing" | "thinking" | "sleeping";
};

export const scenes: Scene[] = [
  { id: "01", time: "07:30", title: "The challan arrives", beat: "Two patties short. Beto POS flags it before anyone signs.", slate: "BOGURA SHOWROOM · 07:30 · DELIVERY", bn: "চালান এল। দুটো প্যাটি কম।", en: "The delivery came in two patties short.", pose: "waving" },
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

export type Feature = { title: string; body: string; icon: string; tag?: string };
export type FeatureGroup = { id: string; label: string; who: string; intro: string; features: Feature[] };

export const featureGroups: FeatureGroup[] = [
  {
    id: "counter",
    label: "Counter app",
    who: "Cashiers · senior cashiers · outlet managers · store keepers",
    intro: "The Bangla counter app runs on Android devices or in any web browser, and keeps selling with no internet.",
    features: [
      { icon: "KeyRound", title: "Staff sign in", body: "Every staff member signs in with their own PIN, even offline. Five wrong attempts lock the account until the manager unlocks it." },
      { icon: "Clock", title: "Shift management", body: "Open a shift with the counted cash float. Close it with counted cash and the difference recorded. X Report for the open shift." },
      { icon: "ScanBarcode", title: "Sales entry", body: "Add products by tile, search or barcode scan. Every tile shows stock level and expiry." },
      { icon: "Percent", title: "Discount control", body: "Cashiers give discounts within their limit. Anything above needs a supervisor PIN." },
      { icon: "Wallet", title: "Payment collection", body: "Cash with change calculation, card, bKash, Nagad, Rocket, Upay and split payments." },
      { icon: "Printer", title: "Receipt printing", body: "The receipt prints the moment a bill is done. Reprints are clearly marked as duplicate." },
      { icon: "Archive", title: "Automatic cash drawer", body: "The drawer opens on its own when a cash sale completes, on supported devices." },
      { icon: "PauseCircle", title: "Bill hold and void", body: "Put a bill on hold and resume it later. Every void asks for confirmation." },
      { icon: "Undo2", title: "Refunds", body: "Refund per item, marked good or damaged, with a mandatory reason and a printed refund slip." },
      { icon: "ShoppingBag", title: "Customer orders", body: "Take orders with a deposit. Hand over when the balance is collected." },
      { icon: "MoonStar", title: "Day close", body: "Outlet-level day close — blocked while any other counter still has an open shift." },
      { icon: "UserCog", title: "Manager mode", body: "Demand requests, challan receiving by scan, daily stock count, label printing, returns to depot and cash handover." },
      { icon: "Activity", title: "Alerts and diagnostics", body: "Manager alerts, plus a System page that checks device, printer, scanner and drawer — with one-tap copy for support." },
      { icon: "WifiOff", title: "Offline operation", body: "Sales, refunds, shifts and counts save on the device and send in sequence when the connection returns." },
      { icon: "MonitorSmartphone", title: "Responsive layouts", body: "Layouts for handheld, tablet and desktop. Desktop shortcuts: F2 search, F9 payment, F4 hold." },
      { icon: "Languages", title: "Bangla interface", body: "Counter screens in Bangla, with Bangla text printed on receipts." },
    ],
  },
  {
    id: "payments",
    label: "Payments",
    who: "Cashiers · accounts team",
    intro: "Customers pay on the provider's own machine or merchant number. Beto POS records every reference so accounts can reconcile against bank and wallet statements.",
    features: [
      { icon: "Banknote", title: "Cash", tag: "Amount received, change, shift drawer cash", body: "The cashier counts cash and gives change. The drawer opens." },
      { icon: "CreditCard", title: "Card", tag: "Amount and approval code", body: "Processed on the bank's own card machine at the counter." },
      { icon: "Smartphone", title: "bKash, Nagad, Rocket, Upay", tag: "Amount and transaction ID (TrxID)", body: "The customer pays the outlet's merchant number from their phone." },
      { icon: "Split", title: "Split payment", tag: "Each part with its own reference", body: "Any combination of the above on a single bill." },
    ],
  },
  {
    id: "drawer",
    label: "Cash drawer",
    who: "Cashiers · outlet managers · head office",
    intro: "Cash is only reachable through a recorded sale. On SUNMI desktop terminals the drawer is wired straight to the printer.",
    features: [
      { icon: "Cable", title: "Direct connection", body: "A standard RJ11 or RJ12 cable to the printer drawer port of the SUNMI T2s or D2s Plus. No driver, no pairing — the device powers the drawer." },
      { icon: "Inbox", title: "Opens on cash sale", body: "The receipt prints and the drawer opens automatically when a cash bill is completed." },
      { icon: "Gauge", title: "Drawer test and state", body: "Test the drawer from the System page and see whether it is open or closed." },
      { icon: "ShieldAlert", title: "Cash control per shift", body: "Float counted at shift open; counted cash and difference recorded at close. Gaps above the outlet's tolerance alert the manager and head office." },
    ],
  },
  {
    id: "console",
    label: "Retail Console",
    who: "Head office · outlet managers · accounts · franchise owners",
    intro: "Operations, inventory, finance and administration from any browser, on a phone or a computer.",
    features: [
      { icon: "CalendarCheck", title: "Daily operations", body: "Today view, bills, customer orders, shifts and day close." },
      { icon: "Boxes", title: "Inventory", body: "Demand, receiving, returns, stock by batch, daily stock count and opening stock." },
      { icon: "Tag", title: "Labels", body: "Print 50 × 30 mm product labels from the back-office computer." },
      { icon: "QrCode", title: "Products and prices", body: "Maintain products, prices, barcodes and batch QR codes." },
      { icon: "Coins", title: "Cash and settlement", body: "Cash handover, settlement, commission and outstanding balances." },
      { icon: "FileChartColumn", title: "Financial reporting", body: "Remittance, commission, settlement and outlet reports." },
      { icon: "BarChart3", title: "Reports and monitoring", body: "Operational reports, alerts and a sync monitor." },
      { icon: "Settings2", title: "Outlet configuration", body: "Outlet code and type, cashier discount limit, cash tolerance per shift, return window, near-expiry warning days, end-of-day stock count, franchise credit limit, receipt footer, stock location and return depot." },
      { icon: "Users", title: "Administration", body: "Manage terminals, users, roles and setup — and revoke a lost or stolen device instantly." },
      { icon: "Building2", title: "Head office view", body: "Every outlet in one view: performance, daily operations and alerts." },
      { icon: "Store", title: "Franchise owner access", body: "Franchise owners see sales, cash and settlement on their own phone." },
    ],
  },
  {
    id: "server",
    label: "Server & sync",
    who: "IT · accounts · support team",
    intro: "One central Retail Server connects every counter and the Retail Console. No local server needed at any outlet.",
    features: [
      { icon: "Server", title: "Central Retail Server", body: "A hosted server connects all counters and the Retail Console." },
      { icon: "RefreshCw", title: "Data synchronisation", body: "Counters sync about every 20 seconds when online, and can trade a full day offline." },
      { icon: "Link2", title: "Terminal pairing", body: "Each device is paired with a unique terminal ID and a token issued once from the Retail Console." },
      { icon: "Globe", title: "Web counter", body: "A browser counter on any computer or phone — always on the latest version." },
      { icon: "Download", title: "App distribution", body: "Install and update from the Beto POS download page, with release notes for every version." },
      { icon: "BookOpen", title: "ERP account posting", body: "Retail sales, refunds and cash post straight to your ERP accounts." },
      { icon: "BellRing", title: "Automated alerts", body: "Day not closed, shift open over 14 hours, counter idle for 30 minutes, cash difference over tolerance, stock count difference." },
      { icon: "Sun", title: "Daily summary", body: "High-priority alerts and a 22:00 daily summary sent to the support team and the Retail Console." },
    ],
  },
];

export const devices = [
  { device: "SUNMI or equivalent Android POS", os: "Android 7.0+", print: "Built-in, direct printing", scan: "Scan head, USB or Bluetooth", drawer: "Automatic on cash sale (desktop models)", ok: true },
  { device: "Other Android phones and tablets", os: "Android 7.0+", print: "Android print dialog", scan: "USB or Bluetooth (keyboard mode)", drawer: "Not supported", ok: false },
  { device: "Windows or Mac with Chrome", os: "Web counter", print: "Browser print dialog", scan: "USB scanner", drawer: "Not supported", ok: false },
];

export const peripherals = [
  { name: "Receipt paper", req: "58 mm or 80 mm thermal rolls to match the device" },
  { name: "Barcode scanner", req: "2D imager, USB or Bluetooth in keyboard (HID) mode, sending Enter after each scan. Reads barcodes and batch QR codes." },
  { name: "Cash drawer", req: "RJ11 or RJ12 cable to the SUNMI desktop printer port" },
  { name: "Label printer", req: "Thermal label printer for 50 × 30 mm labels, from Chrome on the back-office computer" },
  { name: "Card machine", req: "Any bank card machine — the cashier records its approval code" },
];

export const rollout = [
  { week: "Week 1", title: "Set up head office", body: "Import products and the price list. Create stores, roles and staff PINs." },
  { week: "Week 2", title: "Pilot one showroom", body: "Pair its counters with a code. We train cashiers on site, in Bangla." },
  { week: "Week 3", title: "Add a franchise", body: "Settlement and commission switched on. The owner gets their own view." },
  { week: "Week 4+", title: "Roll out the chain", body: "Same setup, copied store by store. Head office watches each one go live." },
];

export const faqs = [
  { q: "What happens when the internet goes down?", a: "Counters keep billing for a full day if needed. Sales, refunds, shifts and stock counts wait on the device and sync in order when the connection is back — no local server required. Online, counters sync about every 20 seconds." },
  { q: "Do we need new hardware?", a: "Beto POS runs on SUNMI or equivalent Android POS devices, any Android phone or tablet on Android 7.0 or later, and in Chrome on Windows or Mac. Most chains start on the devices they already have." },
  { q: "Which payments can the counter take?", a: "Cash with change calculation, card on your bank's card machine, bKash, Nagad, Rocket and Upay to your merchant number, and split payments. Every payment is recorded with its approval code or TrxID so accounts can reconcile." },
  { q: "Does the cash drawer open by itself?", a: "Yes, on SUNMI T2s and D2s Plus desktop terminals. Plug the drawer into the printer port with a standard RJ11 or RJ12 cable — no driver or pairing — and it opens when a cash sale completes." },
  { q: "What if a device is lost or stolen?", a: "Revoke it from the Retail Console and it is cut off immediately. Every counter is paired with its own terminal ID and a one-time token." },
  { q: "Can we move our products and prices from the old POS?", a: "Yes. We import your product list and prices during week one, then publish one price list to every store." },
  { q: "How do franchise owners see their numbers?", a: "Each owner gets their own view of sales, settlement with head office, commission and cash sent — and nothing from other stores." },
  { q: "Who can give discounts or void a bill?", a: "Head office sets the limits per role. Anything above a cashier's limit needs a supervisor PIN, and every void asks for confirmation and is logged." },
  { q: "Is there support in Bangla?", a: "Yes. Training, the counter app and Beto POS AI all work in Bangla, and our team supports you during setup and after go-live." },
];
