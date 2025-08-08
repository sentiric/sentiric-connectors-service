# 🔌 Sentiric Connectors Service - API Kullanım ve Demo Rehberi

Bu belge, çalışan `sentiric-connectors-service`'in API'ını nasıl kullanacağınızı ve "Tak-Çıkar" konektör mimarisinin gücünü nasıl test edeceğinizi gösterir.

## Önkoşullar

*   `docker compose` ile servisin çalışır durumda olması.
*   `curl` veya benzeri bir HTTP istemcisinin terminalinizde kurulu olması.

---

## Uçtan Uca Test Senaryosu: `DummyConnector`

Mimarinin çalıştığını doğrulamak için, sisteme dahil edilmiş olan basit `DummyConnector`'ı kullanacağız. Bu konektör, "ping" ve "echo" adında iki basit eylem (action) içerir.

### Adım 1: Servisin Sağlık Durumunu Kontrol Etme

İlk olarak, servisin ayakta ve sağlıklı olduğundan emin olalım.

```bash
curl http://localhost:5005/health
```

**Başarılı Yanıt:**
```json
{"status":"ok","timestamp":"2025-08-08T12:30:00.123Z"}
```

### Adım 2: Prometheus Metriklerini Görüntüleme

Servisin performans metriklerini topladığını doğrulayalım.

```bash
curl http://localhost:5005/metrics
```

**Başarılı Yanıt:**
Terminalde, `# HELP http_request_duration_ms ...` gibi başlayan, uzun bir metrik listesi göreceksiniz.

### Adım 3: Bir Konektör Eylemini Tetikleme (`ping`)

Şimdi, `/v1/execute` endpoint'ini kullanarak `dummy` konektörünün `ping` eylemini çağıralım.

```bash
curl -X POST http://localhost:5005/v1/execute \
-H "Content-Type: application/json" \
-d '{"connector": "dummy", "action": "ping"}'
```

**Başarılı Yanıt:**
Konektör, beklendiği gibi "pong" yanıtını dönecektir.

```json
{"data":"pong"}
```

### Adım 4: Parametreli Bir Eylemi Tetikleme (`echo`)

Şimdi de `params` gövdesini kullanarak `echo` eylemini çağıralım.

```bash
curl -X POST http://localhost:5005/v1/execute \
-H "Content-Type: application/json" \
-d '{"connector": "dummy", "action": "echo", "params": {"message": "Sentiric Rocks!"}}'
```

**Başarılı Yanıt:**
Konektör, gönderdiğimiz mesajı bize geri yansıtacaktır.

```json
{"data":{"received_message":"Sentiric Rocks!"}}
```

### Adım 5: Hatalı Bir İsteği Test Etme

Var olmayan bir konektörü çağırmayı deneyerek servisin hata yönetimini test edelim.

```bash
curl -X POST http://localhost:5005/v1/execute \
-H "Content-Type: application/json" \
-d '{"connector": "non_existent_connector", "action": "ping"}'
```

**Başarılı Hata Yanıtı (`404 Not Found`):**
Servis, konektörün bulunamadığına dair anlamlı bir hata mesajı dönecektir.

```json
{
  "error": {
    "code": "CONNECTOR_NOT_FOUND",
    "message": "Connector 'non_existent_connector' is not registered."
  }
}
```
