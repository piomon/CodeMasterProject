import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Terms() {
  const { lang } = useLanguage();

  if (lang === "en") {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 max-w-3xl">
          <h1 className="text-4xl font-display font-bold mb-8">Terms of Service</h1>
          <div className="prose prose-invert max-w-none text-muted-foreground space-y-6">
            <p>These Terms of Service govern the use of the CodeMaster AI & Software Solutions website and all services offered by Piotr Montewka operating under the CodeMaster brand.</p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Definitions</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Service Provider</strong> — Piotr Montewka, operating under the CodeMaster brand.</li>
              <li><strong>User</strong> — any natural or legal person using the Website.</li>
              <li><strong>Website</strong> — the web application available at the CodeMaster domain.</li>
              <li><strong>Services</strong> — custom software development, IT training, AI integrations, and consulting offered by the Service Provider.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. General Provisions</h2>
            <p>Using the Website constitutes acceptance of these Terms. The Service Provider reserves the right to modify these Terms at any time. Continued use of the Website after changes constitutes acceptance of the amended Terms.</p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Services</h2>
            <p>The Service Provider offers the following services through the Website:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Browsing the portfolio and interactive project demos.</li>
              <li>Submitting contact inquiries and project requests.</li>
              <li>Using the AI assistant for information about services.</li>
              <li>Creating a user account and saving favorite projects.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. User Accounts</h2>
            <p>Registration is done via Google (OpenID Connect). The user is responsible for maintaining the security of their account. The user may delete their account at any time from the Dashboard.</p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">5. Intellectual Property</h2>
            <p>All content on the Website, including demo projects, text, graphics, logos, and software, is the property of the Service Provider and is protected by copyright law. Reproducing, distributing, or using the content without written consent is prohibited.</p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">6. Liability</h2>
            <p>The Service Provider makes every effort to ensure the Website functions correctly but does not guarantee uninterrupted or error-free availability. The Service Provider is not liable for damages arising from the use of the Website.</p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">7. Contact</h2>
            <p>For matters related to these Terms, please contact: <a href="mailto:montewkapiotr@gmail.com" className="text-primary hover:underline">montewkapiotr@gmail.com</a>, tel: +48 793 020 820.</p>

            <p className="text-sm text-muted-foreground/60 mt-12">Last updated: March 2026</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24 max-w-3xl">
        <h1 className="text-4xl font-display font-bold mb-8">Regulamin</h1>
        <div className="prose prose-invert max-w-none text-muted-foreground space-y-6">
          <p>Niniejszy Regulamin określa zasady korzystania z serwisu internetowego CodeMaster AI & Software Solutions oraz usług świadczonych przez Piotra Montewkę prowadzącego działalność pod marką CodeMaster.</p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Definicje</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Usługodawca</strong> — Piotr Montewka, prowadzący działalność pod marką CodeMaster.</li>
            <li><strong>Użytkownik</strong> — każda osoba fizyczna lub prawna korzystająca z Serwisu.</li>
            <li><strong>Serwis</strong> — aplikacja webowa dostępna pod domeną CodeMaster.</li>
            <li><strong>Usługi</strong> — tworzenie oprogramowania na zamówienie, szkolenia IT, integracje AI oraz consulting oferowane przez Usługodawcę.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. Postanowienia ogólne</h2>
          <p>Korzystanie z Serwisu oznacza akceptację niniejszego Regulaminu. Usługodawca zastrzega sobie prawo do zmiany Regulaminu w dowolnym czasie. Kontynuowanie korzystania z Serwisu po zmianach oznacza akceptację zmienionego Regulaminu.</p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Zakres usług</h2>
          <p>Usługodawca oferuje za pośrednictwem Serwisu następujące usługi:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Przeglądanie portfolio oraz interaktywnych dem projektów.</li>
            <li>Składanie zapytań kontaktowych i ofertowych.</li>
            <li>Korzystanie z asystenta AI w celu uzyskania informacji o usługach.</li>
            <li>Tworzenie konta użytkownika i zapisywanie ulubionych projektów.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Konto użytkownika</h2>
          <p>Rejestracja odbywa się za pośrednictwem Google (OpenID Connect). Użytkownik jest odpowiedzialny za bezpieczeństwo swojego konta. Użytkownik może w każdej chwili usunąć konto z poziomu Panelu.</p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">5. Własność intelektualna</h2>
          <p>Wszelkie treści w Serwisie, w tym projekty demo, teksty, grafiki, logotypy i oprogramowanie, stanowią własność Usługodawcy i są chronione prawem autorskim. Kopiowanie, rozpowszechnianie lub wykorzystywanie treści bez pisemnej zgody jest zabronione.</p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">6. Odpowiedzialność</h2>
          <p>Usługodawca dokłada wszelkich starań, aby Serwis działał prawidłowo, lecz nie gwarantuje nieprzerwanej i bezbłędnej dostępności. Usługodawca nie ponosi odpowiedzialności za szkody wynikłe z korzystania z Serwisu.</p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">7. Kontakt</h2>
          <p>W sprawach związanych z Regulaminem prosimy o kontakt: <a href="mailto:montewkapiotr@gmail.com" className="text-primary hover:underline">montewkapiotr@gmail.com</a>, tel: +48 793 020 820.</p>

          <p className="text-sm text-muted-foreground/60 mt-12">Ostatnia aktualizacja: marzec 2026</p>
        </div>
      </div>
    </Layout>
  );
}
