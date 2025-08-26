# 🔌 Sentiric Connectors Service - Geliştirme Yol Haritası (v4.0)

Bu belge, `connectors-service`'in geliştirme görevlerini projenin genel fazlarına uygun olarak listeler.

---

### **FAZ 1: Temel Konektör Altyapısı (Mevcut Durum)**

**Amaç:** Servisin, yeni konektörlerin kolayca eklenebileceği, dinamik ve tip-güvenli bir temel üzerine inşa edilmesi.

-   [x] **Görev ID: CONN-CORE-01 - Fastify Sunucusu ve Gözlemlenebilirlik**
    -   **Durum:** ✅ **Tamamlandı**
    -   **Kabul Kriterleri:** Servis, `/api/v1/run` ve `/health` endpoint'lerini sunar. Prometheus metrikleri ve yapılandırılmış loglama standartlara uygun şekilde çalışır.

-   [x] **Görev ID: CONN-CORE-02 - Dinamik Konektör Mimarisi**
    -   **Durum:** ✅ **Tamamlandı**
    -   **Kabul Kriterleri:** `ConnectorRegistry`, başlangıçta konektörleri dinamik olarak yükler. Gelen istekteki `connector_name` ve `action_name`'e göre doğru fonksiyonu çağırır. `TypeBox` ile gelen `payload` doğrulanır.

---

### **FAZ 2: Gerçek Dünya Entegrasyonları (Sıradaki Öncelik)**

**Amaç:** Platformun temel "randevu alma" ve "CRM yönetimi" gibi iş süreçlerini otomatize etmesini sağlayacak ilk entegrasyonları hayata geçirmek.

-   [ ] **Görev ID: CONN-001 - Google Calendar Connector**
    -   **Açıklama:** Google Calendar API'si ile entegre olarak, `create_event` ve `find_available_slots` gibi eylemleri destekleyen bir konektör geliştir.
    -   **Kabul Kriterleri:**
        -   [ ] Konektör, Google API için OAuth 2.0 kimlik doğrulamasını başarıyla tamamlayabilmelidir.
        -   [ ] `find_available_slots(date_range, duration)` eylemi, belirtilen aralıkta uygun zaman dilimlerini bir liste olarak döndürmelidir.
        -   [ ] `create_event(start_time, end_time, summary)` eylemi, takvimde yeni bir etkinlik oluşturmalı ve oluşturulan etkinliğin ID'sini döndürmelidir.

-   [ ] **Görev ID: CONN-003 - Güvenli Kimlik Bilgisi Yönetimi**
    -   **Açıklama:** Konektörlerin ihtiyaç duyduğu API anahtarları gibi hassas bilgileri güvenli bir şekilde sunucu tarafında yönet.
    -   **Kabul Kriterleri:**
        -   [ ] Hassas bilgiler (API anahtarları, OAuth token'ları) koddan ve `.env` dosyalarından çıkarılmalıdır.
        -   [ ] Bu bilgiler, şifrelenmiş bir veritabanı tablosunda veya HashiCorp Vault gibi bir sır yönetim aracında saklanmalıdır.
        -   [ ] Konektörler, ihtiyaç duydukları kimlik bilgilerini bu güvenli depodan çalışma zamanında almalıdır.

-   [ ] **Görev ID: CONN-002 - Salesforce (veya başka bir CRM) Connector**
    -   **Açıklama:** Bir CRM sistemi ile entegre olarak `get_contact_details` ve `create_lead` gibi temel eylemleri destekleyen bir konektör geliştir.
    -   **Kabul Kriterleri:**
        -   [ ] Konektör, CRM API'sine başarılı bir şekilde kimlik doğrulaması yapabilmelidir.
        -   [ ] `get_contact_details(phone_number)` eylemi, ilgili kişiye ait temel bilgileri (isim, e-posta vb.) döndürmelidir.
        -   [ ] `create_lead(name, phone_number)` eylemi, CRM'de yeni bir potansiyel müşteri kaydı oluşturmalı ve ID'sini döndürmelidir.

---

### **FAZ 3: Geliştirici Ekosistemi ve Genişleme**

**Amaç:** Üçüncü parti geliştiricilerin platforma kendi konektörlerini eklemesini kolaylaştırmak.

-   [ ] **Görev ID: CONN-004 - Konektör SDK'sı**
    -   **Açıklama:** Yeni konektörler geliştirmeyi kolaylaştıran bir TypeScript/JavaScript SDK'sı oluştur.
    -   **Durum:** ⬜ Planlandı.