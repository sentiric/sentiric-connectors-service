# 🔌 Sentiric Connectors Service

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![Node.js Version](https://img.shields.io/badge/node-20.x-green.svg)](https://nodejs.org/)
[![Framework](https://img.shields.io/badge/framework-Fastify-black.svg)](https://www.fastify.io/)
[![License](https://img.shields.io/badge/license-UNLICENSED-lightgrey.svg)](LICENSE)

**Sentiric Connectors Service**, Sentiric platformunun "elleri ve kollarıdır". `agent-service` gibi merkezi servislerin, harici dünya sistemleriyle (CRM'ler, Takvimler, Veritabanları, ERP'ler vb.) konuşmasını sağlayan, yüksek performanslı ve esnek bir entegrasyon katmanıdır.

Bu servis, platformun soyut AI yeteneklerini, gerçek dünya iş süreçlerini (örn: "Google Takvim'de randevu oluştur", "Salesforce'ta müşteri kaydını güncelle") otomatize edebilen somut eylemlere dönüştürür.

## ✨ Temel Özellikler ve Mimari

*   **Yüksek Performanslı Altyapı:** Node.js ekosisteminin en hızlı web framework'lerinden biri olan **Fastify** üzerine inşa edilmiştir.
*   **"Tak-Çıkar" Konektör Deseni:** Sistemin kalbinde, yeni entegrasyonların (konektörlerin) sadece birkaç dosya eklenerek kolayca sisteme dahil edilmesini sağlayan bir **Kayıt Merkezi (Connector Registry)** bulunur. Bu, projenin "Lego Seti" felsefesinin kusursuz bir uygulamasıdır.
*   **Tip Güvenliği:** Gelen API isteklerinin yapısı, **TypeBox** kullanılarak çalışma zamanında (runtime) doğrulanır. Bu, servisi beklenmedik ve hatalı girdilere karşı son derece dayanıklı kılar.
*   **Üretime Hazır:**
    *   **Gözlemlenebilirlik:** Prometheus metrikleri (`/metrics`) ve ortama duyarlı (JSON/Console) yapılandırılmış loglama (`Pino`) ile tam entegrasyon.
    *   **Dayanıklılık:** `PostgreSQL` gibi bağımlı servislerin sağlıklı olmasını bekleyen `docker-compose` yapılandırması ve "Graceful Shutdown" mekanizması.
*   **Optimize Edilmiş Dağıtım:** Multi-stage Dockerfile ve `npm ci` kullanımı sayesinde, üretim imajı **~150MB** gibi son derece küçük bir boyuta sahiptir ve CI/CD süreçleri optimize edilmiştir.

## 🚀 Hızlı Başlangıç (Docker ile)

Bu servis, `sentiric-infrastructure` reposundaki merkezi `docker-compose` ile platformun bir parçası olarak çalışmak üzere tasarlanmıştır. Tek başına çalıştırmak ve test etmek için:

1.  **Altyapıyı Başlatın:** `connectors-service`, `postgres` servisine bağımlıdır. `sentiric-infrastructure` reposundan bu servisi başlatın.
2.  **`.env` Dosyası Oluşturun:** `.env.docker` dosyasını `.env` olarak kopyalayın ve gerekli API anahtarlarını (örn: `GOOGLE_CALENDAR_API_KEY`) doldurun.
3.  **Servisi Başlatın:**
    ```bash
    docker compose -f docker-compose.service.yml up --build -d
    ```
    Loglarda `Server listening at http://0.0.0.0:5005` mesajını gördüğünüzde servis hazır demektir.

## 🤖 API Kullanımı ve Demo

Servisin API'ını test etmek ve konektör mimarisinin nasıl çalıştığını görmek için lütfen aşağıdaki rehberi inceleyin:

➡️ **[API Kullanım ve Demo Rehberi (DEMO.md)](DEMO.md)**

## 💻 Yerel Geliştirme ve Test

1.  Node.js v20+ ve `npm` kurulu olduğundan emin olun.
2.  Bağımlılıkları kurun:
    ```bash
    npm install
    ```
3.  Servisi geliştirme modunda (hot-reload ile) başlatın:
    ```bash
    npm run dev
    ```
4.  Testleri çalıştırın:
    ```bash
    npm test
    ```
