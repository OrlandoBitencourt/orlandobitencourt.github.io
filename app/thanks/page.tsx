export default function ThanksPage() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        <h1 className="text-3xl font-bold text-white mb-4">Mensagem enviada com sucesso!</h1>
        <p className="text-gray-400 mb-8 max-w-md">
          Obrigado por entrar em contato, vou ler sua mensagem e responder o mais breve possível.
        </p>
        <a
          href="/"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-semibold transition-colors"
        >
          Voltar para a página inicial
        </a>
      </div>
    )
  }
  