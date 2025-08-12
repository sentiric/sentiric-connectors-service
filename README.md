# 🔌 Sentiric Connectors Service

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![Node.js Version](https://img.shields.io/badge/node-20.x-green.svg)](https://nodejs.org/)
[![Framework](https://img.shields.io/badge/framework-Fastify-black.svg)](https://www.fastify.io/)
[![License](https://img.shields.io/badge/license-UNLICENSED-lightgrey.svg)]()

**Sentiric Connectors Service**, Sentiric platformunun "elleri ve kollarıdır". `agent-service` gibi merkezi servislerin, harici dünya sistemleriyle (CRM'ler, Takvimler, Veritabanları, ERP'ler vb.) konuşmasını sağlayan, yüksek performanslı ve esnek bir entegrasyon katmanıdır.

Bu servis, platformun soyut AI yeteneklerini, gerçek dünya iş süreçlerini (örn: "Google Takvim'de randevu oluştur", "Salesforce'ta müşteri kaydını güncelle") otomatize edebilen somut eylemlere dönüştürür.

## ✨ Temel Özellikler ve Mimari

*   **Yüksek Performanslı Altyapı:** Node.js ekosisteminin en hızlı web framework'lerinden biri olan **Fastify** üzerine inşa edilmiştir.
*   **"Tak-Çıkar" Konektör Deseni:** Sistemin kalbinde, yeni entegrasyonların (konektörlerin) sadece birkaç dosya eklenerek kolayca sisteme dahil edilmesini sağlayan bir **Kayıt Merkezi (Connector Registry)** bulunur. Bu, projenin "Lego Seti" felsefesinin kusursuz bir uygulamasıdır.
*   **Tip Güvenliği:** Gelen API isteklerinin yapısı, **TypeBox** kullanılarak çalışma zamanında (runtime) doğrulanır. Bu, servisi beklenmedik ve hatalı girdilere karşı son derece dayanıklı kılar.
*   **Üretime Hazır:**
    *   **Gözlemlenebilirlik:** Prometheus metrikleri (`/metrics`) ve ortama duyarlı (JSON/Console) yapılandırılmış loglama (`Pino`) ile tam entegrasyon.
    *   **Dayanıklılık:** `PostgreSQL` gibi bağımlı servislerin sağlıklı olmasını bekleyen `docker-compose` yapılandırması ve "Graceful Shutdown" mekanizması.

## 🔌 API Etkileşimleri

*   **Gelen (Sunucu):** `sentiric-agent-service`'ten (REST/JSON)
*   **Giden (İstemci):** Harici API'ler (Google Calendar API, Salesforce API vb.)

## 🚀 Yerel Geliştirme

1.  **Bağımlılıkları Kurun:** `npm install`
2.  **Servisi Geliştirme Modunda Başlatın:** `npm run dev`
3.  **Testleri Çalıştırın:** `npm test`

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen projenin ana [Sentiric Governance](https://github.com/sentiric/sentiric-governance) reposundaki kodlama standartlarına ve katkıda bulunma rehberine göz atın.

---
## 🏛️ Anayasal Konum

Bu servis, [Sentiric Anayasası'nın (v11.0)](https://github.com/sentiric/sentiric-governance/blob/main/docs/blueprint/Architecture-Overview.md) **Zeka & Orkestrasyon Katmanı**'nda yer alan merkezi bir bileşendir.