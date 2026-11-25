import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../utils/axios";
import { useLanguage } from "../context/LanguageContext";

function ChatRoom() {
  const { translate: tr } = useLanguage();
  const [contacts, setContacts] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const user = useMemo(() => JSON.parse(localStorage.getItem("user") || "{}"), []);

  const fetchContacts = useCallback(async () => {
    try {
      const res = await api.get("/chat/contacts");
      setContacts(res.data || []);
      if (!selectedId && res.data?.length) {
        setSelectedId(String(res.data[0].user_id));
      }
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  }, [selectedId]);

  const fetchMessages = useCallback(async (receiverId) => {
    if (!receiverId) return;
    try {
      const res = await api.get(`/chat?receiverId=${receiverId}`);
      setMessages(res.data || []);
    } catch (err) {
      console.error("Error fetching messages:", err);
      setMessages([]);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  useEffect(() => {
    if (selectedId) {
      fetchMessages(selectedId);
    }
  }, [fetchMessages, selectedId]);

  const handleSend = async () => {
    if (!selectedId || (!text.trim() && !file)) return;

    const formData = new FormData();
    formData.append("receiverId", selectedId);
    if (text.trim()) formData.append("content", text.trim());
    if (file) formData.append("file", file);

    try {
      setLoading(true);
      const res = await api.post("/chat", formData);
      setMessages((prev) => [...prev, res.data]);
      setText("");
      setFile(null);
    } catch (err) {
      console.error("Error sending message:", err);
      alert(tr(err.response?.data?.message || "Failed to send message."));
    } finally {
      setLoading(false);
    }
  };

  const activeContact = contacts.find((c) => String(c.user_id) === String(selectedId));

  return (
    <div className="max-w-6xl mx-auto my-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
        <aside className="border-b md:border-b-0 md:border-r border-slate-200 bg-slate-50 p-4">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-800">{tr("Contacts")}</h2>
            <p className="text-xs text-slate-500 mt-1">
              {user.role === "admin" ? tr("Your student and scientific contacts") : tr("Chat with admin")}
            </p>
          </div>

          <div className="space-y-2">
            {contacts.length === 0 ? (
              <p className="text-sm text-slate-500">{tr("No contacts available.")}</p>
            ) : (
              contacts.map((contact) => (
                <button
                  key={contact.user_id}
                  type="button"
                  onClick={() => setSelectedId(String(contact.user_id))}
                  className={`w-full text-left rounded-xl p-3 border transition ${
                    String(contact.user_id) === String(selectedId)
                      ? "border-blue-500 bg-blue-50 shadow-sm"
                      : "border-slate-200 bg-white hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-800">{contact.name}</p>
                      <p className="text-xs text-slate-500">{contact.role}</p>
                    </div>
                    <span className="text-xs rounded-full bg-slate-200 px-2 py-1 text-slate-600">{contact.role}</span>
                  </div>
                </button>
              ))
            )}
          </div>
        </aside>

        <section className="md:col-span-2 flex flex-col h-[620px] bg-white">
          <div className="border-b border-slate-200 p-4 bg-slate-50">
            <h3 className="text-lg font-bold text-slate-800">
              {activeContact ? activeContact.name : tr("Select a contact")}
            </h3>
            <p className="text-sm text-slate-500">
              {activeContact ? `${tr("Role")}: ${tr(activeContact.role)}` : tr("Start a conversation")}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-center text-slate-500">
                {tr("No messages yet. Start the conversation.")}
              </div>
            ) : (
              messages.map((msg) => {
                const isMine = Number(msg.sender_id) === Number(user.id);

                return (
                  <div key={msg.message_id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[75%] rounded-2xl px-3 py-2 shadow-sm ${
                        isMine ? "bg-blue-600 text-white" : "bg-white text-slate-800 border border-slate-200"
                      }`}
                    >
                      {msg.content && <p className="text-sm whitespace-pre-wrap">{msg.content}</p>}

                      {msg.file_url && (
                        <a
                          href={msg.file_url}
                          target="_blank"
                          rel="noreferrer"
                          className={`mt-2 block rounded-lg border px-2 py-2 text-xs font-medium underline ${
                            isMine ? "border-blue-400 text-blue-100" : "border-slate-200 text-blue-700"
                          }`}
                        >
                          {msg.file_name || tr("Open document")}
                        </a>
                      )}

                      <div className={`mt-1 text-[10px] ${isMine ? "text-blue-100" : "text-slate-400"}`}>
                        {new Date(msg.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="border-t border-slate-200 p-4 bg-white">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              placeholder={tr("Type your message...")}
              className="w-full resize-none rounded-xl border border-slate-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input type="file" onChange={(e) => setFile(e.target.files[0])} className="text-sm" />
              </label>

              <button
                type="button"
                onClick={handleSend}
                disabled={loading || (!text.trim() && !file)}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-blue-700"
              >
                {loading ? tr("Sending...") : tr("Send message")}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ChatRoom;
