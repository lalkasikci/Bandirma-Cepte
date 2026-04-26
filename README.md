# Bandırma Cepte

Bandırma Cepte, Bandırma’da yaşayan kullanıcıların günlük ihtiyaç duyabileceği temel şehir bilgilerini tek bir mobil uygulama üzerinden sunmayı amaçlayan bir React Native projesidir.

## Proje Amacı

Bu uygulamanın amacı kullanıcıların şehirle ilgili güncel bilgilere hızlı ve kolay şekilde ulaşmasını sağlamaktır.

Uygulama kapsamında sunulacak hizmetler:

* Güncel hava durumu bilgileri
* Son depremler
* Bandırma ile ilgili haberler
* Otobüs saatleri
* Nöbetçi eczaneler
* Şehir etkinlikleri
* Acil numaralar ve önemli kurum bilgileri
* Kullanıcı girişi ve profil yönetimi

## Kullanılan Teknolojiler

* React Native
* React Navigation
* Firebase Authentication
* OpenWeather API
* AFAD / Kandilli Deprem Verileri
* Haber API
* Expo Notifications (opsiyonel)

## Uygulama Modülleri

### 1. Ana Sayfa

Uygulamanın merkez ekranıdır. Kullanıcı tüm modüllere buradan erişebilir.

### 2. Hava Durumu

Bandırma’nın anlık hava durumu bilgileri gösterilir.

Gösterilecek bilgiler:

* Sıcaklık
* Nem oranı
* Rüzgar durumu

### 3. Depremler

Türkiye’de gerçekleşen son depremler listelenir.

Gösterilecek bilgiler:

* Büyüklük
* Konum
* Tarih ve saat

### 4. Haberler

Bandırma ile ilgili güncel haberler listelenir.

### 5. Otobüs Saatleri

Otobüs saatleri ve bir sonraki otobüse kalan süre gösterilir.

### 6. Nöbetçi Eczane

Bandırma’daki nöbetçi eczaneler listelenir.

### 7. Etkinlikler

Şehirde gerçekleşen etkinlikler kullanıcıya sunulur.

### 8. Kullanıcı Girişi

Kullanıcı kayıt olabilir, giriş yapabilir ve oturumunu yönetebilir.

## Haftalık Geliştirme Planı

* 1. Hafta → Uygulama altyapısının kurulması
* 2. Hafta → Hava durumu modülü
* 3. Hafta → Deprem modülü
* 4. Hafta → Haberler modülü
* 5. Hafta → Otobüs saatleri
* 6. Hafta → Acil numaralar ve şehir rehberi
* 7. Hafta → Etkinlik takvimi
* 8. Hafta → Kullanıcı girişi

## Kurulum

```bash
npm install
```

```bash
npx react-native run-android
```

veya

```bash
npx react-native run-ios
```

