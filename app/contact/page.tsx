export default function ContactPage() {
    return (
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Entre em contato</h1>
        <p className="text-gray-400 mb-8">
          Envie um e-mail diretamente para o autor.
        </p>
        <form
          action="https://formspree.io/f/xdkynqjo"
          method="POST"
          className="flex flex-col gap-4"
        >
          <input type="hidden" name="_redirect" value="https://orlandobitencourt.vercel.app/thanks" />
          <input
            type="text"
            name="name"
            placeholder="Seu nome"
            className="p-3 bg-neutral-900 border border-neutral-700 rounded-lg"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Seu e-mail"
            className="p-3 bg-neutral-900 border border-neutral-700 rounded-lg"
            required
          />
          <textarea
            name="message"
            placeholder="Sua mensagem"
            rows={5}
            className="p-3 bg-neutral-900 border border-neutral-700 rounded-lg"
            required
          />
          <button
            type="submit"
            className="p-3 bg-blue-800 hover:bg-blue-500 rounded-lg text-white font-semibold"
          >
            Enviar
          </button>
        </form>
      </div>
    )
  }
  