"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCopyToast } from "@/hooks/useToast";
import { QuickTools } from "@/components/QuickTools";
import { Copy, RefreshCw, Globe, MapPin, DollarSign, Cloud, Newspaper, Search, Network, Clock, Wifi, Building2 } from "lucide-react";

const quickTools = [
  { name: "Weather", href: "#weather", icon: <Cloud className="w-5 h-5" />, description: "Get weather info" },
  { name: "Currency", href: "#currency", icon: <DollarSign className="w-5 h-5" />, description: "Convert currencies" },
  { name: "IP Lookup", href: "#ip", icon: <Network className="w-5 h-5" />, description: "IP geolocation" },
  { name: "News", href: "#news", icon: <Newspaper className="w-5 h-5" />, description: "Latest headlines" },
  { name: "Random User", href: "#user", icon: <Search className="w-5 h-5" />, description: "Generate users" },
  { name: "Quotes", href: "#quotes", icon: <MapPin className="w-5 h-5" />, description: "Inspirational" },
  { name: "Country Info", href: "#country", icon: <Globe className="w-5 h-5" />, description: "Country data" },
  { name: "Time Zone", href: "#timezone", icon: <Clock className="w-5 h-5" />, description: "Time converter" },
];

export default function WebToolsPage() {
  const { copyWithToast } = useCopyToast();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/30 to-slate-100 dark:from-slate-900 dark:via-slate-900/50 dark:to-slate-800">
      <div className="container mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <div className="mb-8 text-center lg:text-left">
          <div className="inline-block mb-4">
            <span className="px-4 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold">
              Web & APIs
            </span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold mb-4 bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 bg-clip-text text-transparent">
            Web & API Tools
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl">
            Free API integrations for real-time data - Weather, News, Currency, IP Lookup, and more
          </p>
        </div>

        <QuickTools tools={quickTools} title="Quick Access" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weather API */}
          <div id="weather" className="scroll-mt-8">
            <WeatherTool />
          </div>
          
          {/* Currency Converter */}
          <CurrencyConverterTool copyWithToast={copyWithToast} />
          
          {/* IP Lookup */}
          <IPLookupTool copyWithToast={copyWithToast} />
          
          {/* News API */}
          <NewsTool />
          
          {/* Random User Generator */}
          <RandomUserTool copyWithToast={copyWithToast} />
          
          {/* Quote Generator */}
          <QuoteTool copyWithToast={copyWithToast} />
          
          {/* Country Info */}
          <CountryInfoTool />
          
          {/* Time Zone Converter */}
          <TimeZoneTool copyWithToast={copyWithToast} />
          
          {/* Domain Checker */}
          <DomainCheckerTool />
          
          {/* HTTP Status Codes */}
          <HTTPStatusTool />
        </div>
      </div>
    </div>
  );
}

// Weather Tool
function WeatherTool() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    try {
      // Using OpenWeatherMap free API (requires API key, but we'll use a demo approach)
      // For demo, using wttr.in which is free and doesn't require API key
      const response = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
      if (response.ok) {
        const data = await response.json();
        setWeather(data);
      } else {
        throw new Error("Failed to fetch weather");
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Cloud className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-xl">Weather Information</CardTitle>
        </div>
        <CardDescription className="text-sm">Get real-time weather data for any city</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            onKeyPress={(e) => e.key === "Enter" && fetchWeather()}
          />
          <Button onClick={fetchWeather} disabled={loading}>
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          </Button>
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {weather && (
          <div className="space-y-3 p-4 bg-muted rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-bold text-2xl">{city}</span>
              <span className="text-lg">{weather.current_condition[0].temp_F}°F</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {weather.current_condition[0].weatherDesc[0].value}
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Humidity: {weather.current_condition[0].humidity}%</div>
              <div>Wind: {weather.current_condition[0].windspeedMiles} mph</div>
              <div>Feels like: {weather.current_condition[0].FeelsLikeF}°F</div>
              <div>UV Index: {weather.current_condition[0].uvIndex}</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Currency Converter
function CurrencyConverterTool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const currencies = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "INR", "BRL"];

  const convert = async () => {
    if (!amount) return;
    setLoading(true);
    try {
      // Using exchangerate-api.com (free tier)
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
      const data = await response.json();
      const rate = data.rates[to];
      const converted = Number(amount) * rate;
      setResult({
        from,
        to,
        amount: Number(amount),
        rate,
        converted,
      });
    } catch (err) {
      console.error("Conversion error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (amount && from && to) {
      const doConvert = async () => {
        if (!amount) return;
        setLoading(true);
        try {
          const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
          const data = await response.json();
          const rate = data.rates[to];
          const converted = Number(amount) * rate;
          setResult({
            from,
            to,
            amount: Number(amount),
            rate,
            converted,
          });
        } catch (err) {
          console.error("Conversion error:", err);
        } finally {
          setLoading(false);
        }
      };
      doConvert();
    }
  }, [amount, from, to]);

  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-xl">Currency Converter</CardTitle>
        </div>
        <CardDescription className="text-sm">Real-time currency conversion</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Amount</Label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="1"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>From</Label>
            <Select value={from} onValueChange={setFrom}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((curr) => (
                  <SelectItem key={curr} value={curr}>
                    {curr}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>To</Label>
            <Select value={to} onValueChange={setTo}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((curr) => (
                  <SelectItem key={curr} value={curr}>
                    {curr}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {loading && <div className="text-sm text-muted-foreground">Loading...</div>}
        {result && (
          <div className="p-4 bg-muted rounded-lg space-y-2">
            <div className="text-2xl font-bold">
              {result.amount} {result.from} = {result.converted.toFixed(2)} {result.to}
            </div>
            <div className="text-sm text-muted-foreground">
              Rate: 1 {result.from} = {result.rate.toFixed(4)} {result.to}
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => copyWithToast(result.converted.toFixed(2), "Converted amount")}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Result
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// IP Lookup
function IPLookupTool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [ip, setIp] = useState("");
  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const lookup = async (ipAddress?: string) => {
    setLoading(true);
    try {
      const targetIP = ipAddress || ip || "";
      // Using ipapi.co free API
      const response = await fetch(`https://ipapi.co/${targetIP || "json"}/`);
      const data = await response.json();
      if (data.error) throw new Error(data.reason);
      setInfo(data);
    } catch (err: any) {
      console.error("IP lookup error:", err);
    } finally {
      setLoading(false);
    }
  };

  const lookupMyIP = () => {
    setIp("");
    lookup();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Network className="w-5 h-5" />
          IP Lookup
        </CardTitle>
        <CardDescription>Get IP geolocation and network information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder="Enter IP address or leave empty"
            onKeyPress={(e) => e.key === "Enter" && lookup()}
          />
          <Button onClick={() => lookup()} disabled={loading}>
            Lookup
          </Button>
        </div>
        <Button onClick={lookupMyIP} variant="outline" className="w-full" disabled={loading}>
          Get My IP
        </Button>
        {loading && <div className="text-sm text-muted-foreground">Loading...</div>}
        {info && (
          <div className="space-y-2 p-4 bg-muted rounded-lg">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><strong>IP:</strong> {info.ip}</div>
              <div><strong>City:</strong> {info.city}</div>
              <div><strong>Region:</strong> {info.region}</div>
              <div><strong>Country:</strong> {info.country_name}</div>
              <div><strong>ISP:</strong> {info.org}</div>
              <div><strong>Timezone:</strong> {info.timezone}</div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => copyWithToast(JSON.stringify(info, null, 2), "IP info")}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy JSON
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// News Tool
function NewsTool() {
  const [country, setCountry] = useState("us");
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    try {
      // Using NewsAPI free tier (requires API key but has a demo endpoint)
      // Alternative: using newsapi.org through a proxy or newsapi.io
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${country}&pageSize=5&apiKey=demo_key`
      ).catch(() => null);
      
      if (response?.ok) {
        const data = await response.json();
        setNews(data.articles || []);
      } else {
        // Fallback to a public news RSS/API
        setNews([
          { title: "News API requires a free API key", description: "Visit newsapi.org to get your free key" },
        ]);
      }
    } catch (err) {
      console.error("News fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Newspaper className="w-5 h-5" />
          News Headlines
        </CardTitle>
        <CardDescription>Get latest news headlines</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="gb">United Kingdom</SelectItem>
              <SelectItem value="in">India</SelectItem>
              <SelectItem value="jp">Japan</SelectItem>
              <SelectItem value="au">Australia</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={fetchNews} disabled={loading}>
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Fetch News"}
          </Button>
        </div>
        {news.length > 0 && (
          <div className="space-y-3">
            {news.map((article, i) => (
              <div key={i} className="p-3 border rounded-lg text-sm">
                <div className="font-semibold">{article.title}</div>
                <div className="text-muted-foreground mt-1">{article.description}</div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Random User Generator
function RandomUserTool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://randomuser.me/api/");
      const data = await response.json();
      setUser(data.results[0]);
    } catch (err) {
      console.error("User fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          Random User Generator
        </CardTitle>
        <CardDescription>Generate random user data for testing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={fetchUser} disabled={loading} className="w-full">
          {loading ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : null}
          Generate User
        </Button>
        {user && (
          <div className="space-y-3 p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-4">
              <img src={user.picture.large} alt="User" className="w-16 h-16 rounded-full" />
              <div>
                <div className="font-bold">{user.name.first} {user.name.last}</div>
                <div className="text-sm text-muted-foreground">{user.email}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><strong>Phone:</strong> {user.phone}</div>
              <div><strong>Location:</strong> {user.location.city}</div>
              <div><strong>Age:</strong> {user.dob.age}</div>
              <div><strong>Gender:</strong> {user.gender}</div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => copyWithToast(JSON.stringify(user, null, 2), "User data")}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy JSON
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Quote Generator
function QuoteTool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      setQuote(data);
    } catch (err) {
      console.error("Quote fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inspirational Quotes</CardTitle>
        <CardDescription>Get random inspirational quotes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={fetchQuote} disabled={loading} className="w-full">
          {loading ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : null}
          Get Quote
        </Button>
        {quote && (
          <div className="p-4 bg-muted rounded-lg space-y-2">
            <div className="text-lg italic">&quot;{quote.content}&quot;</div>
            <div className="text-sm font-semibold">— {quote.author}</div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => copyWithToast(`"${quote.content}" — ${quote.author}`, "Quote")}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Quote
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Country Info
function CountryInfoTool() {
  const [country, setCountry] = useState("");
  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchCountryInfo = async () => {
    if (!country) return;
    setLoading(true);
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(country)}`);
      const data = await response.json();
      if (data && data[0]) {
        setInfo(data[0]);
      }
    } catch (err) {
      console.error("Country info error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Country Information
        </CardTitle>
        <CardDescription>Get detailed information about countries</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Enter country name..."
            onKeyPress={(e) => e.key === "Enter" && fetchCountryInfo()}
          />
          <Button onClick={fetchCountryInfo} disabled={loading}>
            Search
          </Button>
        </div>
        {info && (
          <div className="p-4 bg-muted rounded-lg space-y-2 text-sm">
            <div className="font-bold text-lg">{info.name.common}</div>
            <div><strong>Capital:</strong> {info.capital?.[0]}</div>
            <div><strong>Population:</strong> {info.population.toLocaleString()}</div>
            <div><strong>Region:</strong> {info.region}</div>
            <div><strong>Currency:</strong> {info.currencies ? (Object.values(info.currencies)[0] as { name: string })?.name : "N/A"}</div>
            <div><strong>Languages:</strong> {Object.values(info.languages || {}).join(", ")}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Time Zone Tool
function TimeZoneTool({ copyWithToast }: { copyWithToast: (text: string, label: string) => void }) {
  const [timezone, setTimezone] = useState("America/New_York");
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: timezone,
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      };
      setTime(now.toLocaleString("en-US", options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  const timezones = [
    "America/New_York",
    "America/Los_Angeles",
    "Europe/London",
    "Europe/Paris",
    "Asia/Tokyo",
    "Asia/Shanghai",
    "Asia/Dubai",
    "Australia/Sydney",
    "America/Sao_Paulo",
    "Africa/Johannesburg",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Time Zone Converter
        </CardTitle>
        <CardDescription>Check time in different time zones</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={timezone} onValueChange={setTimezone}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {timezones.map((tz) => (
              <SelectItem key={tz} value={tz}>
                {tz.replace("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {time && (
          <div className="p-4 bg-muted rounded-lg text-center">
            <div className="text-2xl font-bold">{time}</div>
            <Button
              size="sm"
              variant="outline"
              className="mt-2"
              onClick={() => copyWithToast(time, "Time")}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Time
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Domain Checker
function DomainCheckerTool() {
  const [domain, setDomain] = useState("");
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkDomain = async () => {
    if (!domain) return;
    setLoading(true);
    try {
      // Simple DNS check using DNS lookup API (free service)
      const response = await fetch(`https://dns.google/resolve?name=${domain}&type=A`);
      const data = await response.json();
      setStatus({
        domain,
        available: data.Answer ? true : false,
        resolved: data.Answer?.[0]?.data || "Not resolved",
      });
    } catch (err) {
      setStatus({ domain, available: false, error: "Check failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Domain DNS Checker</CardTitle>
        <CardDescription>Check DNS resolution for a domain</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="example.com"
            onKeyPress={(e) => e.key === "Enter" && checkDomain()}
          />
          <Button onClick={checkDomain} disabled={loading}>
            Check
          </Button>
        </div>
        {status && (
          <div className="p-4 bg-muted rounded-lg">
            <div className="font-bold">{status.domain}</div>
            <div className="text-sm mt-1">
              Status: {status.available ? "Resolved" : "Not resolved"}
            </div>
            {status.resolved && (
              <div className="text-sm text-muted-foreground mt-1">IP: {status.resolved}</div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// HTTP Status Codes
function HTTPStatusTool() {
  const [search, setSearch] = useState("");

  const statusCodes = [
    { code: 200, name: "OK", description: "Request succeeded" },
    { code: 201, name: "Created", description: "Resource created successfully" },
    { code: 204, name: "No Content", description: "Request succeeded but no content returned" },
    { code: 400, name: "Bad Request", description: "Invalid request syntax" },
    { code: 401, name: "Unauthorized", description: "Authentication required" },
    { code: 403, name: "Forbidden", description: "Access denied" },
    { code: 404, name: "Not Found", description: "Resource not found" },
    { code: 500, name: "Internal Server Error", description: "Server error occurred" },
    { code: 502, name: "Bad Gateway", description: "Invalid response from upstream server" },
    { code: 503, name: "Service Unavailable", description: "Service temporarily unavailable" },
  ];

  const filtered = statusCodes.filter(
    (s) =>
      s.code.toString().includes(search) ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>HTTP Status Codes</CardTitle>
        <CardDescription>Reference for HTTP status codes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search status codes..."
        />
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filtered.map((status) => (
            <div key={status.code} className="p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <span className="font-bold text-lg">{status.code}</span>
                <div>
                  <div className="font-semibold">{status.name}</div>
                  <div className="text-sm text-muted-foreground">{status.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

