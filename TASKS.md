# 🔌 Sentiric Connectors Service - Görev Listesi

Bu belge, `connectors-service`'in geliştirme yol haritasını ve önceliklerini tanımlar.

---

### Faz 1: Temel Konektör Altyapısı (Mevcut Durum)

Bu faz, servisin "Tak-Çıkar" konektör mimarisini kurmayı ve ilk temel konektörleri oluşturmayı hedefler.

-   [x] **Fastify Tabanlı Sunucu:** Yüksek performanslı ve genişletilebilir bir API sunucusu oluşturma.
-   [x] **Konektör Kayıt Merkezi (`ConnectorRegistry`):** Yeni konektörlerin dinamik olarak kaydedilmesini ve çağrılmasını sağlayan merkezi bir mekanizma.
-   [x] **Tip Güvenliği:** Gelen istekleri `TypeBox` ile doğrulama.
-   [x] **Dummy Connector:** Mimarinin çalıştığını kanıtlayan basit bir "ping/echo" konektörü.
-   [x] **Gözlemlenebilirlik:** Prometheus metrikleri ve yapılandırılmış loglama entegrasyonu.

---

### Faz 2: Gerçek Dünya Entegrasyonları (Sıradaki Öncelik)

Bu faz, platformun gerçek iş süreçlerini otomatize etmesini sağlayacak ilk entegrasyonları hayata geçirmeyi hedefler.

-   [ ] **Görev ID: CONN-001 - Google Calendar Connector**
    -   **Açıklama:** Google Calendar API'si ile entegre olarak, `create_event`, `find_available_slots` gibi eylemleri destekleyen bir konektör geliştir. Bu, "randevu alma" senaryosunun temelini oluşturacaktır.
    -   **Durum:** ⬜ Planlandı.

-   [ ] **Görev ID: CONN-002 - Salesforce Connector**
    -   **Açıklama:** Salesforce API'si ile entegre olarak, `get_contact_details`, `create_lead`, `update_case` gibi eylemleri destekleyen bir konektör geliştir.
    -   **Durum:** ⬜ Planlandı.

-   [ ] **Görev ID: CONN-003 - Güvenli Kimlik Bilgisi Yönetimi**
    -   **Açıklama:** Konektörlerin ihtiyaç duyduğu API anahtarları gibi hassas bilgileri, her istekte göndermek yerine, güvenli bir şekilde sunucu tarafında saklayacak bir mekanizma geliştir (örn: HashiCorp Vault veya şifrelenmiş veritabanı tablosu).
    -   **Durum:** ⬜ Planlandı.

---

### Faz 3: Geliştirici Ekosistemi

Bu faz, üçüncü parti geliştiricilerin platforma kendi konektörlerini eklemesini kolaylaştırmayı hedefler.

-   [ ] **Görev ID: CONN-004 - Konektör SDK'sı**
    -   **Açıklama:** Yeni konektörler geliştirmeyi kolaylaştıran bir TypeScript/JavaScript SDK'sı oluştur. Bu SDK, kimlik doğrulama, hata yönetimi gibi ortak görevleri soyutlamalıdır.
    -   **Durum:** ⬜ Planlandı.