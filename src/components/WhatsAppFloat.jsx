import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/6281234567890"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-[#25d366] flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform duration-300"
      aria-label="Chat WhatsApp"
    >
      <MessageCircle className="w-8 h-8 text-white" fill="white" />
    </a>
  );
}