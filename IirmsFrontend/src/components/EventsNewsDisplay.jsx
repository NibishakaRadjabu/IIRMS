import { useEffect, useState } from "react";
import api from "../utils/axios";
import { useLanguage } from "../context/LanguageContext";

function EventsNewsDisplay() {
  const { translate: tr, language } = useLanguage();
  const dateLocale = { en: "en-US", fr: "fr-FR", rw: "rw-RW", sw: "sw-KE" }[language];
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewMode, setViewMode] = useState("cards");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await api.get("/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <p className="text-gray-500">{tr("Loading...")}</p>
        </div>
      </section>
    );
  }

  if (!events || events.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header with View Mode Toggle */}
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">{tr("Events & News")}</h2>
            <p className="mt-2 text-gray-600">{tr("Stay updated with latest events and announcements")}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("cards")}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                viewMode === "cards"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {tr("📋 Cards")}
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                viewMode === "table"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {tr("📊 Table")}
            </button>
          </div>
        </div>

        {/* Cards View */}
        {viewMode === "cards" && (
          <div className="space-y-16">
            {/* News Section */}
            {events.filter((e) => e.type === "news").length > 0 && (
              <div>
                <div className="mb-8">
                  <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700 mb-3">
                    {tr("Latest Updates")}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900">{tr("News")}</h3>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {events
                    .filter((e) => e.type === "news")
                    .map((item) => (
                      <div
                        key={item.event_id}
                        className="group overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                        onClick={() => setSelectedEvent(item)}
                      >
                        {item.image_url && (
                          <div className="relative h-48 overflow-hidden bg-gray-200">
                            <img
                              src={item.image_url}
                              alt={item.title}
                              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <div className="mb-2">
                            <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                              {tr("News")}
                            </span>
                          </div>
                          <h3 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-blue-600 line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="mb-4 text-sm text-gray-600 line-clamp-3">
                            {item.description}
                          </p>
                          <div className="text-xs text-gray-500">
                            {new Date(item.created_at).toLocaleDateString(dateLocale)}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Events Section */}
            {events.filter((e) => e.type === "event").length > 0 && (
              <div>
                <div className="mb-8">
                  <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700 mb-3">
                    {tr("Coming Soon")}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900">{tr("Upcoming Events")}</h3>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {events
                    .filter((e) => e.type === "event")
                    .map((item) => (
                      <div
                        key={item.event_id}
                        className="group overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border-l-4 border-orange-500"
                        onClick={() => setSelectedEvent(item)}
                      >
                        {item.image_url && (
                          <div className="relative h-48 overflow-hidden bg-gray-200">
                            <img
                              src={item.image_url}
                              alt={item.title}
                              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <div className="mb-2">
                            <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-800">
                              {tr("Event")}
                            </span>
                          </div>
                          {item.event_date && (
                            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-orange-600">
                              <span>📅</span>
                              {                              new Date(item.event_date).toLocaleDateString(dateLocale, {
                                weekday: "short",
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                          )}
                          <h3 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-orange-600 line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="mb-4 text-sm text-gray-600 line-clamp-3">
                            {item.description}
                          </p>
                          <div className="text-xs text-gray-500">
                            {new Date(item.event_date || item.created_at).toLocaleDateString(dateLocale)}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Table View */}
        {viewMode === "table" && (
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{tr("Title")}</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{tr("Type")}</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{tr("Description")}</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{tr("Date")}</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">{tr("Action")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {events.map((item) => (
                    <tr key={item.event_id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.title}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.type === "event"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {tr(item.type)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-sm truncate">
                        {item.description}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {item.event_date
                          ? new Date(item.event_date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : new Date(item.created_at).toLocaleDateString(dateLocale, {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                      </td>
                      <td className="px-6 py-4 text-sm text-center">
                        <button
                          onClick={() => setSelectedEvent(item)}
                          className="text-blue-600 font-semibold hover:text-blue-800 hover:underline"
                        >
                          {tr("View")}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal for full content */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedEvent.image_url && (
              <img
                src={selectedEvent.image_url}
                alt={selectedEvent.title}
                className="w-full h-96 object-cover"
              />
            )}
            <div className="p-8">
              <div className="mb-4 flex items-center justify-between">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    selectedEvent.type === "event"
                      ? "bg-orange-100 text-orange-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {tr(selectedEvent.type)}
                </span>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ✕
                </button>
              </div>

              <h2 className="mb-2 text-3xl font-bold text-gray-900">{selectedEvent.title}</h2>

              {selectedEvent.event_date && (
                <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-orange-600">
                  <span>📅</span>
                  {new Date(selectedEvent.event_date).toLocaleDateString(dateLocale, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              )}

              <div className="mb-4 text-sm text-gray-500">
                {tr("Posted on")} {new Date(selectedEvent.created_at).toLocaleDateString(dateLocale)}
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{tr("Description")}</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedEvent.description}</p>
                </div>
                {selectedEvent.content && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{tr("Details")}</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {selectedEvent.content}
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedEvent(null)}
                className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
              >
                {tr("Close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default EventsNewsDisplay;
