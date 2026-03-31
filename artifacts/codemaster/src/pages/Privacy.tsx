import { Layout } from "@/components/layout/Layout";

export default function Privacy() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-24 max-w-3xl">
        <h1 className="text-4xl font-display font-bold mb-8">Polityka Prywatności</h1>
        <div className="prose prose-invert max-w-none text-muted-foreground space-y-6">
          <p>
            Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych przekazanych przez Użytkowników w związku z korzystaniem z usług CodeMaster AI & Software Solutions.
          </p>
          
          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Administrator Danych</h2>
          <p>
            Administratorem danych osobowych jest Piotr Montewka, prowadzący działalność pod marką CodeMaster. Kontakt: montewkapiotr@gmail.com.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. Cel i zakres zbierania danych</h2>
          <p>
            Dane osobowe (imię, nazwisko, e-mail, nr telefonu) podane w formularzu kontaktowym lub podczas logowania są przetwarzane wyłącznie w celu:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Nawiązania kontaktu i odpowiedzi na zapytania biznesowe.</li>
            <li>Przedstawienia wyceny usług programistycznych i szkoleniowych.</li>
            <li>Obsługi konta w panelu klienta (logowanie OIDC).</li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Prawa Użytkownika</h2>
          <p>
            Użytkownik ma prawo do żądania dostępu do swoich danych, ich sprostowania, usunięcia lub ograniczenia przetwarzania, a także prawo do przenoszenia danych i wniesienia sprzeciwu.
          </p>
          
          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Logowanie i uwierzytelnianie</h2>
          <p>
            System wykorzystuje logowanie z użyciem Replit Auth (OpenID Connect). W procesie tym zapisywane są niezbędne pliki cookies sesyjne (HttpOnly, Secure) wymagane do utrzymania autoryzacji w aplikacji.
          </p>
        </div>
      </div>
    </Layout>
  );
}
