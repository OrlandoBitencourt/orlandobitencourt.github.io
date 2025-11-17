import Link from "next/link"

export const metadata = {
  title: 'Sobre Mim',
  description: 'Conheça mais sobre Orlando Bitencourt - Tech Lead e Senior Software Development Analyst',
}

export default function AboutPage() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        Sobre Mim
      </h1>

      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <img
            src="/me.jpg"
            alt="Orlando Bitencourt"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-neutral-700 dark:border-neutral-300 shadow-lg"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">Orlando Cechlar Bitencourt</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">
              Tech Lead | Senior Software Development Analyst
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Especializado em desenvolvimento backend com <strong>Golang</strong> e <strong>Python</strong>. 
              Atualmente na <strong>Serasa Experian</strong>, sou apaixonado por criar soluções escaláveis, 
              trabalhar com metodologias ágeis e construir sistemas que impactam milhões de usuários.
            </p>
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-neutral-300 dark:border-neutral-700">
          Experiência Profissional
        </h2>
        
        <div className="space-y-8">
            <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300 mt-3">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">▹</span>
                <span>Desenvolvimento e evolução de plataformas web em Golang e Python</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">▹</span>
                <span>Arquitetura e documentação de microsserviços escaláveis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">▹</span>
                <span>Gerenciamento de bancos de dados: PostgreSQL, DynamoDB e ElasticSearch</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">▹</span>
                <span>Monitoramento e observabilidade com Datadog, Dynatrace, Kibana e Splunk</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">▹</span>
                <span>Design e implementação de APIs RESTful e microsserviços</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">▹</span>
                <span>Liderança técnica: code reviews, mentoria e manutenção de alto padrão de qualidade</span>
              </li>
            </ul>
          </div>
        </div>

      {/* Skills Section */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-neutral-300 dark:border-neutral-700">
         Stack Tecnológico
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-neutral-50 dark:bg-neutral-900 p-5 rounded-lg border border-neutral-200 dark:border-neutral-800">
            <h3 className="font-semibold mb-3 text-neutral-900 dark:text-neutral-100">Linguagens</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-blue-500/20 text-blue-700 dark:text-blue-400 rounded-md text-sm font-medium">
                Golang
              </span>
              <span className="px-3 py-1.5 bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 rounded-md text-sm font-medium">
                Python
              </span>
              <span className="px-3 py-1.5 bg-purple-500/20 text-purple-700 dark:text-purple-400 rounded-md text-sm font-medium">
                SQL
              </span>
            </div>
          </div>

          <div className="bg-neutral-50 dark:bg-neutral-900 p-5 rounded-lg border border-neutral-200 dark:border-neutral-800">
            <h3 className="font-semibold mb-3 text-neutral-900 dark:text-neutral-100">Cloud & DevOps</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-orange-500/20 text-orange-700 dark:text-orange-400 rounded-md text-sm font-medium">
                AWS
              </span>
              <span className="px-3 py-1.5 bg-blue-500/20 text-blue-700 dark:text-blue-400 rounded-md text-sm font-medium">
                Docker
              </span>
              <span className="px-3 py-1.5 bg-green-500/20 text-green-700 dark:text-green-400 rounded-md text-sm font-medium">
                Rancher
              </span>
            </div>
          </div>

          <div className="bg-neutral-50 dark:bg-neutral-900 p-5 rounded-lg border border-neutral-200 dark:border-neutral-800">
            <h3 className="font-semibold mb-3 text-neutral-900 dark:text-neutral-100">Bancos de Dados</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-blue-500/20 text-blue-700 dark:text-blue-400 rounded-md text-sm font-medium">
                PostgreSQL
              </span>
              <span className="px-3 py-1.5 bg-orange-500/20 text-orange-700 dark:text-orange-400 rounded-md text-sm font-medium">
                DynamoDB
              </span>
              <span className="px-3 py-1.5 bg-teal-500/20 text-teal-700 dark:text-teal-400 rounded-md text-sm font-medium">
                ElasticSearch
              </span>
              <span className="px-3 py-1.5 bg-red-500/20 text-red-700 dark:text-red-400 rounded-md text-sm font-medium">
                Oracle
              </span>
            </div>
          </div>

          <div className="bg-neutral-50 dark:bg-neutral-900 p-5 rounded-lg border border-neutral-200 dark:border-neutral-800">
            <h3 className="font-semibold mb-3 text-neutral-900 dark:text-neutral-100">Monitoramento & Tools</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-purple-500/20 text-purple-700 dark:text-purple-400 rounded-md text-sm font-medium">
                Datadog
              </span>
              <span className="px-3 py-1.5 bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 rounded-md text-sm font-medium">
                Dynatrace
              </span>
              <span className="px-3 py-1.5 bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 rounded-md text-sm font-medium">
                Kibana
              </span>
              <span className="px-3 py-1.5 bg-green-500/20 text-green-700 dark:text-green-400 rounded-md text-sm font-medium">
                Splunk
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="mb-12 bg-gradient-to-r from-neutral-50 to-indigo-50 dark:from-neutral-950/30 dark:to-indigo-950/30 p-6 rounded-lg border border-blue-200 dark:border-blue-900">
        <h2 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
          💡 Filosofia de Trabalho
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
          Acredito que as linguagens de programação são apenas <strong>ferramentas</strong> para 
          transformar regras de negócio em código e otimizar soluções. O verdadeiro desafio está 
          em entender profundamente o problema e escolher a melhor abordagem para resolvê-lo.
        </p>
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
          Mantenho sempre um <strong>alto padrão de qualidade</strong> através de code reviews, 
          testes automatizados e boas práticas de arquitetura, trabalhando colaborativamente 
          em equipes ágeis.
        </p>
      </div>

      {/* CTA Section */}
      <div className="text-center py-8 px-6 bg-gradient-to-r from-neutral-50 to-indigo-50 dark:from-neutral-950/30 dark:to-indigo-950/30 rounded-lg border border-neutral-200 dark:border-neutral-800">
        <h2 className="text-xl font-semibold mb-3">🤝 Vamos conversar?</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-5">
          Estou sempre aberto a novas oportunidades e colaborações
        </p>
        <Link 
          href="/contact" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-lg hover:shadow-xl"
        >
          Entre em contato
          <span>→</span>
        </Link>
      </div>
    </section>
  )
}