import { SalonDemo } from "./demos/SalonDemo";
import { BarberDemo } from "./demos/BarberDemo";
import { HotelDemo } from "./demos/HotelDemo";
import { FitnessDemo } from "./demos/FitnessDemo";
import { CarRentalDemo } from "./demos/CarRentalDemo";
import { RestaurantDemo } from "./demos/RestaurantDemo";
import { ConfiguratorDemo } from "./demos/ConfiguratorDemo";
import { EcommerceDemo } from "./demos/EcommerceDemo";
import { DashboardDemo } from "./demos/DashboardDemo";
import { RealEstateDemo } from "./demos/RealEstateDemo";
import { AccountingDemo } from "./demos/AccountingDemo";
import { LawFirmDemo } from "./demos/LawFirmDemo";
import { MarketingDemo } from "./demos/MarketingDemo";
import { ElearningDemo } from "./demos/ElearningDemo";
import { MentoringDemo } from "./demos/MentoringDemo";
import { AiDemo } from "./demos/AiDemo";
import { HealthcareDemo } from "./demos/HealthcareDemo";
import { ServiceDemo } from "./demos/ServiceDemo";
import { BookingDemo } from "./demos/BookingDemo";
import { EventsDemo } from "./demos/EventsDemo";
import { CalculatorDemo } from "./demos/CalculatorDemo";

interface DemoPreviewProps {
  project: {
    name: string;
    category: string;
    industry: string;
    features: string[];
  };
}

export function DemoPreview({ project }: DemoPreviewProps) {
  const cat = (project.category || "").toLowerCase();
  const ind = (project.industry || "").toLowerCase();
  const nm = (project.name || "").toLowerCase();

  if (ind.includes("food") || nm.includes("restauracja") || nm.includes("restaurant"))
    return <RestaurantDemo name={project.name} features={project.features} />;

  if (nm.includes("barber") || nm.includes("fryzjer"))
    return <BarberDemo name={project.name} features={project.features} />;

  if (nm.includes("salon") || nm.includes("kosmetycz") || (ind.includes("beauty") && !nm.includes("barber")))
    return <SalonDemo name={project.name} features={project.features} />;

  if (nm.includes("hotel") || nm.includes("apartament") || ind.includes("hospitality"))
    return <HotelDemo name={project.name} features={project.features} />;

  if (nm.includes("siłownia") || nm.includes("fitness") || ind.includes("fitness"))
    return <FitnessDemo name={project.name} features={project.features} />;

  if (nm.includes("wypożyczalnia") || ind.includes("automotive") || (nm.includes("aut") && nm.includes("rezerwacj")))
    return <CarRentalDemo name={project.name} features={project.features} />;

  if (nm.includes("kuchni") || ind.includes("kitchen"))
    return <ConfiguratorDemo name={project.name} features={project.features} industry="Kitchen" />;

  if (nm.includes("szaf") || ind.includes("furniture") || cat.includes("configurator"))
    return <ConfiguratorDemo name={project.name} features={project.features} industry={project.industry} />;

  if (nm.includes("deweloper") || nm.includes("nieruchom") || cat.includes("real estate") || ind.includes("construction"))
    return <RealEstateDemo name={project.name} features={project.features} />;

  if (nm.includes("biuro") || nm.includes("rachunkow") || ind.includes("finance"))
    return <AccountingDemo name={project.name} features={project.features} />;

  if (nm.includes("kancelaria") || nm.includes("prawn") || ind.includes("legal"))
    return <LawFirmDemo name={project.name} features={project.features} />;

  if (nm.includes("agencja") || nm.includes("marketingow") || ind.includes("marketing"))
    return <MarketingDemo name={project.name} features={project.features} />;

  if (cat.includes("healthcare") || ind.includes("medical") || nm.includes("klinika") || nm.includes("medycz"))
    return <HealthcareDemo name={project.name} features={project.features} />;

  if (nm.includes("mentor") || nm.includes("premium"))
    return <MentoringDemo name={project.name} features={project.features} />;

  if (cat.includes("e-learning") || ind.includes("education") || nm.includes("szkoła") || nm.includes("kurs"))
    return <ElearningDemo name={project.name} features={project.features} />;

  if (cat.includes("ai") || nm.includes("ai") || nm.includes("chatbot") || nm.includes("assistant"))
    return <AiDemo name={project.name} features={project.features} />;

  if (cat.includes("events") || ind.includes("entertainment") || nm.includes("event") || nm.includes("bilet"))
    return <EventsDemo name={project.name} features={project.features} />;

  if ((cat.includes("service") || nm.includes("serwis") || nm.includes("napraw")) && ind.includes("it"))
    return <BookingDemo name={project.name} features={project.features} />;

  if (cat.includes("service") || nm.includes("serwis") || nm.includes("napraw"))
    return <ServiceDemo name={project.name} features={project.features} />;

  if (cat.includes("calculator") || nm.includes("kalkulator") || nm.includes("wycen") || nm.includes("budowlan"))
    return <CalculatorDemo name={project.name} features={project.features} />;

  if (cat.includes("e-commerce") || ind.includes("retail") || nm.includes("sklep") || nm.includes("e-commerce"))
    return <EcommerceDemo name={project.name} features={project.features} />;

  return <DashboardDemo name={project.name} features={project.features} industry={project.industry} />;
}
