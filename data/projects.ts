export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  subject: string;
  price: number;
  image: string;
  technology: "Arduino" | "ESP32";
  components: string[];
  code: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Rain Alarm using Arduino",
    slug: "rain-alarm-arduino",
    description: "Detects rain using a sensor and triggers an alarm with a buzzer. Perfect for weather monitoring applications.",
    fullDescription: "This project uses a rain sensor module connected to an Arduino UNO to detect rainfall. When rain is detected, the system activates a buzzer alarm and an LED indicator. Ideal for automating windows, protecting outdoor equipment, and learning analog sensor interfacing.",
    subject: "Engineering Physics",
    price: 1399,
    image: "/images/rain-alarm.png",
    technology: "Arduino",
    components: ["Arduino UNO", "Rain Sensor Module", "Buzzer", "LED", "10kΩ Resistor", "9V Battery", "Breadboard", "Jumper Wires"],
    code: `// Rain Alarm using Arduino
const int rainSensor = A0;
const int buzzer = 8;
const int led = 13;

void setup() {
  pinMode(buzzer, OUTPUT);
  pinMode(led, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int value = analogRead(rainSensor);
  Serial.println(value);
  if (value < 500) {
    digitalWrite(buzzer, HIGH);
    digitalWrite(led, HIGH);
  } else {
    digitalWrite(buzzer, LOW);
    digitalWrite(led, LOW);
  }
  delay(100);
}`,
    featured: true,
  },
  {
    id: 2,
    title: "Home Automation using ESP32",
    slug: "home-automation-esp32",
    description: "Control home appliances remotely via Wi-Fi using a smartphone or web browser with the ESP32.",
    fullDescription: "This project demonstrates IoT-based home automation using the ESP32 microcontroller. It hosts a web server on the local network that lets you control up to 4 relays (appliances) from any browser on your phone or PC. Teaches networking, HTTP, and relay interfacing.",
    subject: "Emerging and Disruptive Technologies",
    price: 1899,
    image: "/images/home-automation.png",
    technology: "ESP32",
    components: ["ESP32 Dev Board", "4-Channel Relay Module", "5V Power Supply", "LED Indicators", "Breadboard", "Jumper Wires", "USB Cable"],
    code: `// Home Automation ESP32
#include <WiFi.h>
#include <WebServer.h>

const char* ssid = "YourSSID";
const char* password = "YourPassword";
WebServer server(80);

const int relay1 = 26, relay2 = 27, relay3 = 14, relay4 = 12;

void handleRoot() {
  String html = "<h1>Home Automation</h1>";
  html += "<button onclick=\"fetch('/on1')\">Light ON</button>";
  html += "<button onclick=\"fetch('/off1')\">Light OFF</button>";
  server.send(200, "text/html", html);
}

void setup() {
  pinMode(relay1, OUTPUT);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) delay(500);
  server.on("/", handleRoot);
  server.on("/on1", []() { digitalWrite(relay1, HIGH); server.send(200,"text/plain","ON"); });
  server.on("/off1", []() { digitalWrite(relay1, LOW); server.send(200,"text/plain","OFF"); });
  server.begin();
}

void loop() { server.handleClient(); }`,
    featured: true,
  },
  {
    id: 3,
    title: "Clap Switch using Arduino",
    slug: "clap-switch-arduino",
    description: "Turn lights on or off with a clap sound using a sound sensor and Arduino relay circuit.",
    fullDescription: "A fun and practical project where clapping your hands toggles a relay to switch a light or appliance. Uses a sound detection sensor (KY-037) to pick up the clap sound, and an Arduino processes the signal to toggle the relay state. Great introduction to sound sensors and relay control.",
    subject: "Digital Electronics",
    price: 1399,
    image: "/images/clap-switch.png",
    technology: "Arduino",
    components: ["Arduino UNO", "Sound Sensor Module (KY-037)", "Relay Module (5V)", "LED", "Resistors", "Breadboard", "Jumper Wires"],
    code: `// Clap Switch Arduino
const int soundPin = 2;
const int relayPin = 8;
bool relayState = false;
int lastState = HIGH;
unsigned long lastDebounce = 0;

void setup() {
  pinMode(soundPin, INPUT);
  pinMode(relayPin, OUTPUT);
  digitalWrite(relayPin, LOW);
}

void loop() {
  int reading = digitalRead(soundPin);
  if (reading == LOW && lastState == HIGH) {
    if (millis() - lastDebounce > 200) {
      relayState = !relayState;
      digitalWrite(relayPin, relayState);
      lastDebounce = millis();
    }
  }
  lastState = reading;
}`,
    featured: true,
  },
  {
    id: 4,
    title: "Temperature Monitor with Display",
    slug: "temperature-monitor-arduino",
    description: "Real-time temperature and humidity monitoring using DHT11 sensor with LCD display output.",
    fullDescription: "Monitor ambient temperature and humidity using the DHT11 sensor with live readings shown on a 16x2 LCD display. The project also logs data to the Serial Monitor and triggers an LED alert if temperature exceeds a threshold. Great for learning sensor interfacing and I2C displays.",
    subject: "Engineering Physics",
    price: 1899,
    image: "/images/temperature-monitor.png",
    technology: "Arduino",
    components: ["Arduino UNO", "DHT11 Sensor", "16x2 LCD with I2C", "Red LED", "220Ω Resistor", "Breadboard", "Jumper Wires"],
    code: `// Temperature Monitor
#include <DHT.h>
#include <LiquidCrystal_I2C.h>

#define DHTPIN 2
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);
LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  dht.begin();
  lcd.init();
  lcd.backlight();
}

void loop() {
  float temp = dht.readTemperature();
  float hum = dht.readHumidity();
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Temp: " + String(temp) + "C");
  lcd.setCursor(0, 1);
  lcd.print("Hum: " + String(hum) + "%");
  delay(2000);
}`,
    featured: true,
  },
  {
    id: 5,
    title: "Smart Dustbin with Ultrasonic",
    slug: "smart-dustbin-arduino",
    description: "Automatic dustbin lid that opens when your hand approaches using an ultrasonic sensor and servo motor.",
    fullDescription: "This smart dustbin project uses an HC-SR04 ultrasonic sensor to detect when a hand is within 20 cm, then commands a servo motor to open the lid automatically. After 3 seconds, the lid closes. Introduces distance sensing, servo control, and practical automation design.",
    subject: "Emerging and Disruptive Technologies",
    price: 1999,
    image: "/images/smart-dustbin.png",
    technology: "Arduino",
    components: ["Arduino UNO", "HC-SR04 Ultrasonic Sensor", "Servo Motor (SG90)", "9V Battery", "Breadboard", "Jumper Wires"],
    code: `// Smart Dustbin
#include <Servo.h>
Servo lidServo;
const int trigPin = 9, echoPin = 10;

long getDistance() {
  digitalWrite(trigPin, LOW); delayMicroseconds(2);
  digitalWrite(trigPin, HIGH); delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  return pulseIn(echoPin, HIGH) * 0.034 / 2;
}

void setup() {
  lidServo.attach(6);
  lidServo.write(0);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  if (getDistance() < 20) {
    lidServo.write(90);
    delay(3000);
    lidServo.write(0);
    delay(1000);
  }
}`,
    featured: false,
  },
  {
    id: 6,
    title: "Line Following Robot",
    slug: "line-following-robot",
    description: "Autonomous robot that follows a black line on white surface using IR sensors and motor driver.",
    fullDescription: "A classic robotics project using two IR sensors to detect a black line on a white surface. The Arduino processes sensor inputs and controls two DC motors via an L298N driver to keep the robot on track. Great for learning feedback control, motor driving, and embedded logic.",
    subject: "Digital Electronics",
    price: 1999,
    image: "/images/line-follower.png",
    technology: "Arduino",
    components: ["Arduino UNO", "L298N Motor Driver", "2x DC Motors", "2x IR Sensors", "Robot Chassis", "18650 Battery", "Wheels", "Jumper Wires"],
    code: `// Line Following Robot
const int leftIR = 2, rightIR = 3;
const int in1=8, in2=9, in3=10, in4=11;
const int ena=5, enb=6;

void forward() { digitalWrite(in1,HIGH); digitalWrite(in2,LOW); digitalWrite(in3,HIGH); digitalWrite(in4,LOW); }
void turnLeft() { digitalWrite(in1,LOW); digitalWrite(in2,HIGH); digitalWrite(in3,HIGH); digitalWrite(in4,LOW); }
void turnRight() { digitalWrite(in1,HIGH); digitalWrite(in2,LOW); digitalWrite(in3,LOW); digitalWrite(in4,HIGH); }
void stopMotors() { digitalWrite(in1,LOW); digitalWrite(in2,LOW); digitalWrite(in3,LOW); digitalWrite(in4,LOW); }

void setup() {
  for(int i=2;i<=11;i++) pinMode(i, (i<=3)?INPUT:OUTPUT);
  analogWrite(ena, 150); analogWrite(enb, 150);
}

void loop() {
  int l=digitalRead(leftIR), r=digitalRead(rightIR);
  if(!l && !r) forward();
  else if(l && !r) turnLeft();
  else if(!l && r) turnRight();
  else stopMotors();
}`,
    featured: false,
  },
  {
    id: 7,
    title: "Smart Plant Monitor ESP32",
    slug: "smart-plant-monitor-esp32",
    description: "IoT plant care system that monitors soil moisture, temperature and sends alerts to your phone via Wi-Fi.",
    fullDescription: "Keep your plants healthy with this ESP32-based IoT project. It reads soil moisture using a capacitive sensor, temperature with a DHT11, and publishes data to a ThingSpeak or Blynk dashboard. Alerts are sent when moisture drops below a threshold. Perfect intro to IoT data publishing.",
    subject: "Emerging and Disruptive Technologies",
    price: 2199,
    image: "/images/plant-monitor.png",
    technology: "ESP32",
    components: ["ESP32", "Capacitive Soil Moisture Sensor", "DHT11 Sensor", "OLED 0.96\" Display", "5V Water Pump (optional)", "Relay Module", "Breadboard", "Jumper Wires"],
    code: `// Smart Plant Monitor
#include <WiFi.h>
#include <DHT.h>

#define DHTPIN 4
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);
const int moisturePin = 34;

void setup() {
  Serial.begin(115200);
  dht.begin();
  WiFi.begin("SSID", "PASSWORD");
  while (WiFi.status() != WL_CONNECTED) delay(500);
  Serial.println("WiFi Connected: " + WiFi.localIP().toString());
}

void loop() {
  int moisture = map(analogRead(moisturePin), 0, 4095, 100, 0);
  float temp = dht.readTemperature();
  Serial.printf("Moisture: %d%% | Temp: %.1fC\\n", moisture, temp);
  if (moisture < 30) Serial.println("ALERT: Water your plant!");
  delay(5000);
}`,
    featured: false,
  },
  {
    id: 8,
    title: "Gas Leakage Detector",
    slug: "gas-leakage-detector",
    description: "Detects LPG and smoke levels in the air using MQ-2 sensor and alerts with buzzer and LED.",
    fullDescription: "This safety project uses the MQ-2 gas sensor to detect LPG, methane, smoke, and other combustible gases. When concentration exceeds a safe threshold, the Arduino triggers a loud buzzer and red LED alarm. An optional GSM module can send SMS alerts. Critical for learning safety system design.",
    subject: "Semiconductor Physics",
    price: 1999,
    image: "/images/gas-detector.png",
    technology: "Arduino",
    components: ["Arduino UNO", "MQ-2 Gas Sensor", "Buzzer", "Red LED", "Green LED", "220Ω Resistors", "Breadboard", "Jumper Wires"],
    code: `// Gas Leakage Detector
const int mq2Pin = A0;
const int buzzer = 8;
const int redLed = 7;
const int greenLed = 6;
const int threshold = 300;

void setup() {
  pinMode(buzzer, OUTPUT);
  pinMode(redLed, OUTPUT);
  pinMode(greenLed, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int gasLevel = analogRead(mq2Pin);
  Serial.println("Gas Level: " + String(gasLevel));
  if (gasLevel > threshold) {
    digitalWrite(buzzer, HIGH);
    digitalWrite(redLed, HIGH);
    digitalWrite(greenLed, LOW);
  } else {
    digitalWrite(buzzer, LOW);
    digitalWrite(redLed, LOW);
    digitalWrite(greenLed, HIGH);
  }
  delay(200);
}`,
    featured: false,
  },
  {
    id: 9,
    title: "Solar Tracker System",
    slug: "solar-tracker",
    description: "Dual-axis solar panel tracker using LDR sensors and servo motors to maximize solar energy capture.",
    fullDescription: "Maximize solar panel efficiency by building a dual-axis tracker. Four LDR sensors compare light intensity in different directions, and the Arduino adjusts two servo motors to orient the panel toward the brightest light source. An excellent project combining physics, embedded systems, and renewable energy.",
    subject: "Engineering Physics",
    price: 2999,
    image: "/images/solar-tracker.png",
    technology: "Arduino",
    components: ["Arduino UNO", "4x LDR Sensors", "2x Servo Motors (SG90)", "4x 10kΩ Resistors", "Solar Panel (small)", "Breadboard", "Jumper Wires"],
    code: `// Solar Tracker
#include <Servo.h>
Servo servoH, servoV;
int posH = 90, posV = 90;

void setup() {
  servoH.attach(9); servoV.attach(10);
  servoH.write(posH); servoV.write(posV);
}

void loop() {
  int topLeft = analogRead(A0), topRight = analogRead(A1);
  int botLeft = analogRead(A2), botRight = analogRead(A3);
  int avgTop = (topLeft + topRight) / 2;
  int avgBot = (botLeft + botRight) / 2;
  int avgLeft = (topLeft + botLeft) / 2;
  int avgRight = (topRight + botRight) / 2;
  if (abs(avgTop - avgBot) > 50) posV += (avgTop > avgBot) ? 1 : -1;
  if (abs(avgLeft - avgRight) > 50) posH += (avgLeft > avgRight) ? -1 : 1;
  posH = constrain(posH, 0, 180);
  posV = constrain(posV, 0, 180);
  servoH.write(posH); servoV.write(posV);
  delay(50);
}`,
    featured: false,
  },
  {
    id: 10,
    title: "Automatic Street Light",
    slug: "automatic-street-light",
    description: "LDR-based automatic street light that turns ON at dusk and OFF at dawn without manual switching.",
    fullDescription: "A practical energy-saving project using an LDR (Light Dependent Resistor) to sense ambient light levels. When light falls below a threshold (nighttime), the Arduino activates a relay to turn on an LED street light. Teaches analog sensing, relay switching, and automatic control systems.",
    subject: "Semiconductor Physics",
    price: 1849,
    image: "/images/street-light.jpg",
    technology: "Arduino",
    components: ["Arduino UNO", "LDR Sensor", "10kΩ Resistor", "Relay Module (5V)", "High-Brightness LED", "9V Battery", "Breadboard", "Jumper Wires"],
    code: `// Automatic Street Light
const int ldrPin = A0;
const int relayPin = 8;
const int threshold = 500;

void setup() {
  pinMode(relayPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int ldrValue = analogRead(ldrPin);
  Serial.println("LDR Value: " + String(ldrValue));
  if (ldrValue < threshold) {
    digitalWrite(relayPin, HIGH); // Night - Light ON
  } else {
    digitalWrite(relayPin, LOW);  // Day - Light OFF
  }
  delay(500);
}`,
    featured: false,
  },
  {
    id: 11,
    title: "Fire Alarm System",
    slug: "fire-alarm-system",
    description: "Detects fire using flame sensor and temperature rise, triggers alarm with buzzer and sends Wi-Fi alert.",
    fullDescription: "A dual-detection fire alarm using both a flame sensor (IR-based) and temperature sensor (LM35) for higher reliability. The ESP32 version can also push notifications to a phone via IFTTT webhook when fire is detected. Critical for learning multi-sensor fusion and emergency response logic.",
    subject: "Semiconductor Physics",
    price: 1899,
    image: "/images/fire-alarm.png",
    technology: "ESP32",
    components: ["ESP32 Dev Board", "Flame Sensor Module", "LM35 Temperature Sensor", "Buzzer", "Red LED", "220Ω Resistor", "Breadboard", "Jumper Wires"],
    code: `// Fire Alarm System ESP32
const int flamePin = 34;
const int tempPin = 35;
const int buzzer = 26;
const int redLed = 27;
const float tempThreshold = 60.0;

void setup() {
  pinMode(buzzer, OUTPUT);
  pinMode(redLed, OUTPUT);
  Serial.begin(115200);
}

void loop() {
  int flameValue = analogRead(flamePin);
  float voltage = analogRead(tempPin) * (3.3 / 4095.0);
  float temperature = voltage * 100;
  Serial.printf("Flame: %d | Temp: %.1fC\\n", flameValue, temperature);
  if (flameValue < 1000 || temperature > tempThreshold) {
    digitalWrite(buzzer, HIGH);
    digitalWrite(redLed, HIGH);
    Serial.println("FIRE DETECTED!");
  } else {
    digitalWrite(buzzer, LOW);
    digitalWrite(redLed, LOW);
  }
  delay(500);
}`,
    featured: false,
  },
  {
    id: 12,
    title: "Bluetooth Controlled Car",
    slug: "bluetooth-car",
    description: "Control a 4-wheel robot car wirelessly via Bluetooth using your Android smartphone and HC-05 module.",
    fullDescription: "Build a fully functional Bluetooth-controlled robot car using an Arduino, L298N motor driver, and HC-05 Bluetooth module. Control it using the free 'Arduino Bluetooth Controller' app on Android. Supports forward, backward, left, right, and stop commands. Great introduction to wireless communication and motor control.",
    subject: "Digital Electronics",
    price: 3499,
    image: "/images/bt-car.png",
    technology: "Arduino",
    components: ["Arduino UNO", "HC-05 Bluetooth Module", "L298N Motor Driver", "4x TT DC Motors", "4WD Robot Chassis", "Li-Po Battery 7.4V", "Jumper Wires", "Wheels & Casters"],
    code: `// Bluetooth Car
char command;
const int in1=8,in2=9,in3=10,in4=11,ena=5,enb=6;

void forward(){digitalWrite(in1,1);digitalWrite(in2,0);digitalWrite(in3,1);digitalWrite(in4,0);}
void backward(){digitalWrite(in1,0);digitalWrite(in2,1);digitalWrite(in3,0);digitalWrite(in4,1);}
void left(){digitalWrite(in1,0);digitalWrite(in2,1);digitalWrite(in3,1);digitalWrite(in4,0);}
void right(){digitalWrite(in1,1);digitalWrite(in2,0);digitalWrite(in3,0);digitalWrite(in4,1);}
void stopCar(){for(int i=8;i<=11;i++)digitalWrite(i,0);}

void setup() {
  Serial.begin(9600);
  for(int i=5;i<=11;i++) pinMode(i,OUTPUT);
  analogWrite(ena,200); analogWrite(enb,200);
}

void loop() {
  if (Serial.available()) {
    command = Serial.read();
    if(command=='F') forward();
    else if(command=='B') backward();
    else if(command=='L') left();
    else if(command=='R') right();
    else if(command=='S') stopCar();
  }
}`,
    featured: false,
  },
  // ==========================================
  // NEW ENGINEERING PHYSICS PROJECTS (12)
  // ==========================================
  {
    id: 13,
    title: "Laser Security Alarm System",
    slug: "laser-security-alarm",
    description: "A laser-based security system that triggers an alarm when the beam is interrupted. Demonstrates optics and light detection.",
    fullDescription: "This project demonstrates principles of optics and light detection by creating a security system using a laser module and a Light Dependent Resistor (LDR). The laser beam is aimed at the LDR, and when anything interrupts the beam (like a person crossing it), the Arduino detects the change in light and triggers a loud buzzer alarm. Perfect for understanding photodetection and practical security applications.",
    subject: "Engineering Physics",
    price: 1899,
    image: "/images/laser-security.png",
    technology: "Arduino",
    components: ["Arduino UNO", "Laser Module (5mW)", "LDR Sensor", "Buzzer", "LED", "10kΩ Resistor", "9V Battery", "Breadboard", "Jumper Wires"],
    code: `// Laser Security Alarm System
const int ldrPin = A0;
const int buzzer = 8;
const int led = 13;
int threshold = 500;

void setup() {
  pinMode(buzzer, OUTPUT);
  pinMode(led, OUTPUT);
  Serial.begin(9600);
  Serial.println("Laser Security System Active");
}

void loop() {
  int ldrValue = analogRead(ldrPin);
  Serial.print("LDR Value: ");
  Serial.println(ldrValue);

  if (ldrValue < threshold) {
    // Beam interrupted - ALARM!
    digitalWrite(buzzer, HIGH);
    digitalWrite(led, HIGH);
    Serial.println("!! INTRUDER DETECTED !!");
  } else {
    digitalWrite(buzzer, LOW);
    digitalWrite(led, LOW);
  }
  delay(100);
}`,
    featured: true,
  },
  {
    id: 14,
    title: "Ultrasonic Distance Measurement",
    slug: "ultrasonic-distance-measurement",
    description: "Measures distances using ultrasonic sound waves and displays results on an LCD. Demonstrates sound wave reflection principles.",
    fullDescription: "This project uses an HC-SR04 ultrasonic sensor to measure distances by sending ultrasonic pulses and measuring the time it takes for the echo to return. The distance is calculated using the speed of sound and displayed on a 16x2 LCD. It demonstrates the physics of sound wave propagation, reflection, and the relationship between time, speed, and distance.",
    subject: "Engineering Physics",
    price: 1699,
    image: "/images/ultrasonic-distance.png",
    technology: "Arduino",
    components: ["Arduino UNO", "HC-SR04 Ultrasonic Sensor", "16x2 LCD Display", "10kΩ Potentiometer", "Breadboard", "Jumper Wires", "9V Battery"],
    code: `// Ultrasonic Distance Measurement
#include <LiquidCrystal.h>
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

const int trigPin = 9;
const int echoPin = 10;

void setup() {
  lcd.begin(16, 2);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  Serial.begin(9600);
  lcd.print("Distance Meter");
  delay(1000);
}

void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  long duration = pulseIn(echoPin, HIGH);
  float distance = duration * 0.034 / 2;

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Distance:");
  lcd.setCursor(0, 1);
  lcd.print(distance);
  lcd.print(" cm");

  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");
  delay(500);
}`,
    featured: false,
  },
  {
    id: 15,
    title: "Light Intensity Meter (LDR Based)",
    slug: "light-intensity-meter",
    description: "Measures ambient light intensity using an LDR sensor and displays readings. Demonstrates photoconductivity principles.",
    fullDescription: "This project demonstrates the principle of photoconductivity using a Light Dependent Resistor (LDR). The LDR changes its resistance based on the intensity of light falling on it. The Arduino reads this change and converts it into a light intensity value displayed on an LCD. It also categorizes the light level as Dark, Dim, Normal, or Bright — illustrating how semiconductor properties change with photon absorption.",
    subject: "Engineering Physics",
    price: 1449,
    image: "/images/light-intensity.png",
    technology: "Arduino",
    components: ["Arduino UNO", "LDR Sensor", "16x2 LCD Display", "10kΩ Resistor", "Potentiometer", "Breadboard", "Jumper Wires"],
    code: `// Light Intensity Meter using LDR
#include <LiquidCrystal.h>
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

const int ldrPin = A0;

void setup() {
  lcd.begin(16, 2);
  Serial.begin(9600);
  lcd.print("Light Meter");
  delay(1000);
}

void loop() {
  int ldrValue = analogRead(ldrPin);
  int intensity = map(ldrValue, 0, 1023, 0, 100);

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Intensity: ");
  lcd.print(intensity);
  lcd.print("%");

  lcd.setCursor(0, 1);
  if (intensity < 20) lcd.print("Level: Dark");
  else if (intensity < 50) lcd.print("Level: Dim");
  else if (intensity < 75) lcd.print("Level: Normal");
  else lcd.print("Level: Bright");

  Serial.print("Light: ");
  Serial.print(intensity);
  Serial.println("%");
  delay(500);
}`,
    featured: false,
  },
  {
    id: 16,
    title: "Solar Panel Lighting System",
    slug: "solar-panel-lighting",
    description: "A solar-powered LED lighting system demonstrating the photoelectric effect and renewable energy harvesting.",
    fullDescription: "This project demonstrates the photoelectric effect and solar energy conversion using a small solar panel to charge a battery and power LED lights. The Arduino monitors the solar panel voltage and battery level, automatically switching LEDs on at dusk and off at dawn. It provides a practical understanding of photovoltaic cells, energy storage, and the physics of semiconductor p-n junctions in solar cells.",
    subject: "Engineering Physics",
    price: 1699,
    image: "/images/solar-lighting.png",
    technology: "Arduino",
    components: ["Arduino UNO", "6V Solar Panel", "3.7V Li-ion Battery", "TP4056 Charging Module", "LDR Sensor", "LEDs (x4)", "10kΩ Resistor", "Breadboard", "Jumper Wires"],
    code: `// Solar Panel Lighting System
const int solarPin = A0;
const int batteryPin = A1;
const int ldrPin = A2;
const int ledPin = 9;

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
  Serial.println("Solar Lighting System");
}

void loop() {
  int solar = analogRead(solarPin);
  int battery = analogRead(batteryPin);
  int light = analogRead(ldrPin);

  float solarV = solar * (5.0 / 1023.0) * 2;
  float battV = battery * (5.0 / 1023.0) * 2;

  Serial.print("Solar: ");
  Serial.print(solarV);
  Serial.print("V | Battery: ");
  Serial.print(battV);
  Serial.print("V | Light: ");
  Serial.println(light);

  // Auto LED: ON when dark, OFF in sunlight
  if (light < 300) {
    analogWrite(ledPin, 255);
    Serial.println("LEDs: ON (Dark)");
  } else {
    analogWrite(ledPin, 0);
    Serial.println("LEDs: OFF (Daylight)");
  }
  delay(1000);
}`,
    featured: false,
  },
  {
    id: 17,
    title: "Hall Effect Speed Measurement",
    slug: "hall-effect-speed-measurement",
    description: "Measures rotational speed using the Hall effect and a magnet. Demonstrates magnetism and electromagnetic induction.",
    fullDescription: "This project uses a Hall Effect sensor to measure the rotational speed (RPM) of a motor or wheel. A small magnet is attached to the rotating object, and each time it passes the sensor, a pulse is generated. The Arduino counts these pulses to calculate RPM in real-time, displaying results on an LCD. It demonstrates the Hall Effect — a fundamental concept in magnetism where a voltage is generated perpendicular to current flow in the presence of a magnetic field.",
    subject: "Engineering Physics",
    price: 1999,
    image: "/images/hall-effect.png",
    technology: "Arduino",
    components: ["Arduino UNO", "Hall Effect Sensor (A3144)", "Neodymium Magnet", "16x2 LCD Display", "DC Motor", "10kΩ Resistor", "Breadboard", "Jumper Wires"],
    code: `// Hall Effect Speed Measurement (RPM)
#include <LiquidCrystal.h>
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

const int hallPin = 3;
volatile int pulseCount = 0;
unsigned long lastTime = 0;
float rpm = 0;

void countPulse() {
  pulseCount++;
}

void setup() {
  lcd.begin(16, 2);
  pinMode(hallPin, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(hallPin), countPulse, FALLING);
  Serial.begin(9600);
  lcd.print("RPM Meter");
  delay(1000);
}

void loop() {
  if (millis() - lastTime >= 1000) {
    detachInterrupt(digitalPinToInterrupt(hallPin));
    rpm = pulseCount * 60.0;
    pulseCount = 0;
    lastTime = millis();
    attachInterrupt(digitalPinToInterrupt(hallPin), countPulse, FALLING);
  }

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Speed Monitor");
  lcd.setCursor(0, 1);
  lcd.print("RPM: ");
  lcd.print(rpm, 0);

  Serial.print("RPM: ");
  Serial.println(rpm);
  delay(500);
}`,
    featured: false,
  },
  {
    id: 18,
    title: "Single Axis Solar Tracking System",
    slug: "single-axis-solar-tracker",
    description: "A sun-tracking solar panel that automatically follows the sun for maximum energy capture. Demonstrates renewable energy physics.",
    fullDescription: "This project builds a single-axis solar tracking system using two LDR sensors and a servo motor to orient a solar panel toward the brightest light source. By comparing the light intensity on both sides of the panel, the Arduino adjusts the servo to keep the panel perpendicular to sunlight, maximizing energy capture. It demonstrates photovoltaic principles, light sensing, and feedback control systems.",
    subject: "Engineering Physics",
    price: 1799,
    image: "/images/solar-tracker.png",
    technology: "Arduino",
    components: ["Arduino UNO", "6V Solar Panel", "Servo Motor (SG90)", "LDR Sensors (x2)", "10kΩ Resistors (x2)", "Breadboard", "Mechanical Mount", "Jumper Wires"],
    code: `// Single Axis Solar Tracker
#include <Servo.h>
Servo tracker;

const int ldrLeft = A0;
const int ldrRight = A1;
int pos = 90;
int tolerance = 30;

void setup() {
  tracker.attach(9);
  tracker.write(pos);
  Serial.begin(9600);
  Serial.println("Solar Tracker Active");
  delay(1000);
}

void loop() {
  int left = analogRead(ldrLeft);
  int right = analogRead(ldrRight);
  int diff = left - right;

  Serial.print("Left: ");
  Serial.print(left);
  Serial.print(" | Right: ");
  Serial.print(right);
  Serial.print(" | Diff: ");
  Serial.println(diff);

  if (abs(diff) > tolerance) {
    if (diff > 0 && pos < 170) {
      pos++;
    } else if (diff < 0 && pos > 10) {
      pos--;
    }
    tracker.write(pos);
  }

  Serial.print("Servo Pos: ");
  Serial.println(pos);
  delay(50);
}`,
    featured: true,
  },
  {
    id: 19,
    title: "Piezoelectric Energy Generation Model",
    slug: "piezoelectric-energy-generation",
    description: "Generates electricity from mechanical pressure using piezoelectric discs. Demonstrates the piezoelectric effect in physics.",
    fullDescription: "This project demonstrates the piezoelectric effect — the generation of electrical voltage from mechanical stress on certain crystals. Piezoelectric discs generate small voltages when pressed or vibrated, and this energy is rectified, stored in a capacitor, and used to light up LEDs. The Arduino monitors the voltage generated and displays energy harvesting data. It's an excellent model for understanding energy conversion and smart materials in physics.",
    subject: "Engineering Physics",
    price: 1999,
    image: "/images/piezoelectric-energy.png",
    technology: "Arduino",
    components: ["Arduino UNO", "Piezoelectric Discs (x4)", "Bridge Rectifier (1N4007 x4)", "100µF Capacitor", "LEDs (x3)", "16x2 LCD Display", "Breadboard", "Jumper Wires"],
    code: `// Piezoelectric Energy Generation
#include <LiquidCrystal.h>
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

const int piezoPin = A0;
const int ledPin = 13;
float totalEnergy = 0;
int hitCount = 0;

void setup() {
  lcd.begin(16, 2);
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
  lcd.print("Piezo Energy");
  lcd.setCursor(0, 1);
  lcd.print("Press the disc!");
  delay(2000);
}

void loop() {
  int reading = analogRead(piezoPin);
  float voltage = reading * (5.0 / 1023.0);

  if (voltage > 0.1) {
    hitCount++;
    totalEnergy += voltage;
    digitalWrite(ledPin, HIGH);
    Serial.print("Hit #");
    Serial.print(hitCount);
    Serial.print(" | Voltage: ");
    Serial.print(voltage, 2);
    Serial.println("V");
    delay(200);
  } else {
    digitalWrite(ledPin, LOW);
  }

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("V:");
  lcd.print(voltage, 2);
  lcd.print(" Hits:");
  lcd.print(hitCount);
  lcd.setCursor(0, 1);
  lcd.print("Total: ");
  lcd.print(totalEnergy, 1);
  lcd.print("V");
  delay(100);
}`,
    featured: false,
  },
  {
    id: 20,
    title: "Eddy Current Braking System",
    slug: "eddy-current-braking",
    description: "Demonstrates electromagnetic braking without physical contact using eddy currents induced in a metal disc.",
    fullDescription: "This project demonstrates electromagnetic induction and Lenz's Law by creating a contactless braking system. When a metal disc (aluminum or copper) rotates near strong magnets, eddy currents are induced in the disc, which in turn create a magnetic field opposing the motion — slowing it down without any physical contact. The Arduino measures the RPM before and after braking to quantify the braking effect. This is the same principle used in modern train and roller coaster brakes.",
    subject: "Engineering Physics",
    price: 1999,
    image: "/images/eddy-current.jpg",
    technology: "Arduino",
    components: ["Arduino UNO", "DC Motor", "Aluminum/Copper Disc", "Neodymium Magnets (x4)", "Hall Effect Sensor", "16x2 LCD Display", "Motor Driver (L298N)", "Breadboard", "Jumper Wires"],
    code: `// Eddy Current Braking System
#include <LiquidCrystal.h>
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

const int hallPin = 3;
const int motorPin = 9;
volatile int pulses = 0;
float rpm = 0;
bool braking = false;

void countPulse() { pulses++; }

void setup() {
  lcd.begin(16, 2);
  pinMode(hallPin, INPUT_PULLUP);
  pinMode(motorPin, OUTPUT);
  attachInterrupt(digitalPinToInterrupt(hallPin), countPulse, FALLING);
  Serial.begin(9600);
  lcd.print("Eddy Braking");
  delay(1000);
  analogWrite(motorPin, 200);
}

void loop() {
  static unsigned long lastTime = 0;
  if (millis() - lastTime >= 1000) {
    detachInterrupt(digitalPinToInterrupt(hallPin));
    rpm = pulses * 60.0;
    pulses = 0;
    lastTime = millis();
    attachInterrupt(digitalPinToInterrupt(hallPin), countPulse, FALLING);
  }

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("RPM: ");
  lcd.print(rpm, 0);
  lcd.setCursor(0, 1);
  lcd.print(braking ? "BRAKE: ON" : "BRAKE: OFF");

  Serial.print("RPM: ");
  Serial.print(rpm);
  Serial.println(braking ? " [BRAKING]" : " [FREE]");
  delay(500);
}`,
    featured: false,
  },
  {
    id: 21,
    title: "Optical Fiber Communication Model",
    slug: "optical-fiber-communication",
    description: "Transmits data through optical fiber using a laser, demonstrating total internal reflection and modern communication.",
    fullDescription: "This project demonstrates the principle of total internal reflection used in optical fiber communication. A laser transmitter sends modulated light signals through a fiber optic cable, and a photodetector on the other end receives and decodes the signal. The Arduino modulates the laser with a message and the receiver displays it — showing how modern high-speed internet works at the physics level. Covers concepts of refraction, critical angle, and signal modulation.",
    subject: "Engineering Physics",
    price: 2199,
    image: "/images/optical-fiber.png",
    technology: "Arduino",
    components: ["Arduino UNO (x2)", "Laser Module", "Photodetector (LDR/Photodiode)", "Optical Fiber Cable (1m)", "LEDs", "Resistors", "Breadboard", "Jumper Wires"],
    code: `// Optical Fiber Communication - TRANSMITTER
// Upload to Arduino #1
const int laserPin = 9;
String message = "HELLO";

void setup() {
  pinMode(laserPin, OUTPUT);
  Serial.begin(9600);
  Serial.println("Optical TX Ready");
}

void transmitChar(char c) {
  for (int i = 7; i >= 0; i--) {
    int bit = (c >> i) & 1;
    digitalWrite(laserPin, bit ? HIGH : LOW);
    delay(100); // Bit duration
  }
  digitalWrite(laserPin, LOW);
  delay(200); // Gap between chars
}

void loop() {
  Serial.print("Sending: ");
  Serial.println(message);
  for (int i = 0; i < message.length(); i++) {
    transmitChar(message[i]);
  }
  delay(3000); // Wait before retransmit
}

// --- RECEIVER CODE (upload to Arduino #2) ---
// const int sensorPin = A0;
// int threshold = 500;
// void setup() { Serial.begin(9600); }
// void loop() {
//   char c = 0;
//   for (int i = 7; i >= 0; i--) {
//     int val = analogRead(sensorPin);
//     if (val > threshold) c |= (1 << i);
//     delay(100);
//   }
//   if (c != 0) Serial.print(c);
//   delay(200);
// }`,
    featured: true,
  },
  {
    id: 22,
    title: "Young's Modulus Experimental Setup",
    slug: "youngs-modulus-setup",
    description: "Measures the Young's modulus of a wire by tracking elongation under different loads using precision sensors.",
    fullDescription: "This project automates the classic Young's Modulus experiment using a load cell to measure applied force and a linear displacement sensor to track wire elongation. The Arduino calculates stress, strain, and Young's modulus in real-time and displays results on an LCD. It replaces traditional manual measurements with electronic precision, demonstrating the physics of elasticity — how materials deform under stress and return to their original shape.",
    subject: "Engineering Physics",
    price: 1999,
    image: "/images/youngs-modulus.jpg",
    technology: "Arduino",
    components: ["Arduino UNO", "Load Cell (1kg)", "HX711 Amplifier", "Linear Potentiometer", "16x2 LCD Display", "Test Wire (Steel)", "Weights Set", "Mechanical Frame", "Breadboard", "Jumper Wires"],
    code: `// Young's Modulus Measurement
#include <LiquidCrystal.h>
#include <HX711.h>
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);
HX711 scale;

const int dispPin = A0;
float wireLength = 1.0;   // meters
float wireDia = 0.0005;   // meters (0.5mm)
float wireArea;

void setup() {
  lcd.begin(16, 2);
  scale.begin(6, 7);
  scale.set_scale(2280.f);
  scale.tare();
  wireArea = 3.14159 * (wireDia/2) * (wireDia/2);
  Serial.begin(9600);
  lcd.print("Young's Modulus");
  delay(2000);
}

void loop() {
  float force = scale.get_units(5) * 9.81 / 1000;
  int dispRaw = analogRead(dispPin);
  float elongation = map(dispRaw, 0, 1023, 0, 5000) / 1000000.0;

  float stress = force / wireArea;
  float strain = elongation / wireLength;
  float youngsM = (strain > 0) ? stress / strain : 0;

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("F:");
  lcd.print(force, 2);
  lcd.print("N dL:");
  lcd.print(elongation*1000, 2);
  lcd.setCursor(0, 1);
  lcd.print("Y:");
  lcd.print(youngsM/1e9, 1);
  lcd.print(" GPa");

  Serial.print("Force: ");
  Serial.print(force);
  Serial.print("N | Y: ");
  Serial.print(youngsM/1e9);
  Serial.println(" GPa");
  delay(500);
}`,
    featured: false,
  },
  {
    id: 23,
    title: "Photoelectric Effect Demonstration",
    slug: "photoelectric-effect",
    description: "Demonstrates the photoelectric effect by showing how light of different wavelengths ejects electrons from a surface.",
    fullDescription: "This project provides a modern demonstration of the photoelectric effect — one of the key experiments that led to quantum mechanics. Using UV LEDs and photodetectors, it shows how light above a certain frequency threshold ejects electrons from a photosensitive surface, generating a measurable current. The Arduino measures the photocurrent at different light intensities and wavelengths, displaying results that verify Einstein's photoelectric equation. A fundamental physics demonstration made interactive.",
    subject: "Engineering Physics",
    price: 1899,
    image: "/images/photoelectric.png",
    technology: "Arduino",
    components: ["Arduino UNO", "UV LED", "Blue LED", "Red LED", "Photodiode", "Op-Amp (LM358)", "16x2 LCD Display", "Resistors Set", "Breadboard", "Jumper Wires", "Dark Enclosure"],
    code: `// Photoelectric Effect Demonstration
#include <LiquidCrystal.h>
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

const int photoPin = A0;
const int uvLED = 7;
const int blueLED = 8;
const int redLED = 9;

void setup() {
  lcd.begin(16, 2);
  pinMode(uvLED, OUTPUT);
  pinMode(blueLED, OUTPUT);
  pinMode(redLED, OUTPUT);
  Serial.begin(9600);
  lcd.print("Photoelectric");
  lcd.setCursor(0, 1);
  lcd.print("Effect Demo");
  delay(2000);
}

void testLED(const char* name, int pin) {
  digitalWrite(uvLED, LOW);
  digitalWrite(blueLED, LOW);
  digitalWrite(redLED, LOW);
  delay(500);
  int dark = analogRead(photoPin);

  digitalWrite(pin, HIGH);
  delay(1000);
  int lit = analogRead(photoPin);
  digitalWrite(pin, LOW);

  float current = (lit - dark) * (5.0/1023.0);
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print(name);
  lcd.setCursor(0, 1);
  lcd.print("I: ");
  lcd.print(current, 3);
  lcd.print(" mA");
  Serial.print(name);
  Serial.print(" -> Current: ");
  Serial.println(current, 3);
  delay(3000);
}

void loop() {
  testLED("UV Light", uvLED);
  testLED("Blue Light", blueLED);
  testLED("Red Light", redLED);

  lcd.clear();
  lcd.print("UV > Blue > Red");
  lcd.setCursor(0, 1);
  lcd.print("E = hf - W");
  delay(3000);
}`,
    featured: false,
  },
  {
    id: 24,
    title: "Magnetic Levitation Model",
    slug: "magnetic-levitation",
    description: "Levitates an object using electromagnetic force with real-time feedback control. Demonstrates magnetic repulsion physics.",
    fullDescription: "This project creates a simple magnetic levitation system where an electromagnet holds a small magnetic object suspended in mid-air using feedback control. A Hall Effect sensor measures the position of the floating object, and the Arduino rapidly adjusts the electromagnet's current to maintain stable levitation. It demonstrates electromagnetic force, Earnshaw's theorem limitations, feedback control systems, and the balance between gravitational and magnetic forces. One of the most visually impressive physics demonstrations.",
    subject: "Engineering Physics",
    price: 4599,
    image: "/images/magnetic-levitation.png",
    technology: "Arduino",
    components: ["Arduino UNO", "Electromagnet Coil", "Hall Effect Sensor (A3144)", "MOSFET (IRF540)", "Diode (1N4007)", "Neodymium Magnet (small)", "12V Power Supply", "Resistors", "Mechanical Frame", "Jumper Wires"],
    code: `// Magnetic Levitation Controller
const int hallPin = A0;
const int coilPin = 9;
int setpoint = 512;
float kp = 2.0;
float ki = 0.5;
float kd = 1.0;
float integral = 0;
float lastError = 0;

void setup() {
  pinMode(coilPin, OUTPUT);
  Serial.begin(9600);
  Serial.println("Magnetic Levitation Active");

  // Calibrate setpoint
  Serial.println("Place object... calibrating");
  delay(2000);
  setpoint = analogRead(hallPin);
  Serial.print("Setpoint: ");
  Serial.println(setpoint);
}

void loop() {
  int position = analogRead(hallPin);
  float error = setpoint - position;

  integral += error;
  integral = constrain(integral, -1000, 1000);
  float derivative = error - lastError;
  lastError = error;

  float output = kp * error + ki * integral + kd * derivative;
  output = constrain(output, 0, 255);

  analogWrite(coilPin, (int)output);

  Serial.print("Pos:");
  Serial.print(position);
  Serial.print(" Err:");
  Serial.print(error);
  Serial.print(" Out:");
  Serial.println((int)output);

  delay(5); // Fast loop for stability
}`,
    featured: true,
  },
  // ==========================================
  // NEW DIGITAL ELECTRONICS PROJECTS (15)
  // ==========================================
  {
    id: 25,
    title: "Digital Dice Using 555 Timer",
    slug: "digital-dice-555-timer",
    description: "A digital dice that generates random numbers 1-6 using a 555 timer IC and LED display. Demonstrates random pulse generation.",
    fullDescription: "This project creates an electronic dice using a 555 timer IC in astable mode to generate high-frequency pulses fed into a 4017 decade counter. When the button is released, the counter stops at a random position, lighting up LEDs arranged in a dice pattern (1-6). It demonstrates how digital pulse generation, counting circuits, and randomness work in electronics — core concepts of Digital Electronics.",
    subject: "Digital Electronics",
    price: 1749,
    image: "/images/digital-dice.jpg",
    technology: "Arduino",
    components: ["555 Timer IC", "CD4017 Decade Counter", "LEDs (x7)", "Push Button", "Resistors (10kΩ, 100kΩ)", "Capacitors (0.01µF, 10µF)", "9V Battery", "Breadboard", "Jumper Wires"],
    code: `// Digital Dice using Arduino
// Simulates 555 timer + counter behavior
const int ledPins[] = {2, 3, 4, 5, 6, 7, 8};
const int buttonPin = 9;
// LED patterns for dice faces 1-6
const bool dicePatterns[6][7] = {
  {0,0,0,1,0,0,0}, // 1
  {1,0,0,0,0,0,1}, // 2
  {1,0,0,1,0,0,1}, // 3
  {1,0,1,0,1,0,1}, // 4
  {1,0,1,1,1,0,1}, // 5
  {1,1,1,0,1,1,1}, // 6
};
int currentFace = 0;
bool rolling = false;

void setup() {
  for (int i = 0; i < 7; i++) pinMode(ledPins[i], OUTPUT);
  pinMode(buttonPin, INPUT_PULLUP);
  Serial.begin(9600);
  Serial.println("Digital Dice Ready!");
}

void displayFace(int face) {
  for (int i = 0; i < 7; i++) {
    digitalWrite(ledPins[i], dicePatterns[face][i]);
  }
}

void loop() {
  if (digitalRead(buttonPin) == LOW) {
    rolling = true;
    currentFace = random(0, 6);
    displayFace(currentFace);
    delay(50);
  } else if (rolling) {
    rolling = false;
    Serial.print("Dice shows: ");
    Serial.println(currentFace + 1);
  }
}`,
    featured: false,
  },
  {
    id: 26,
    title: "Electronic Voting Machine (EVM)",
    slug: "electronic-voting-machine",
    description: "A miniature electronic voting machine with candidate buttons, vote counting, and LCD result display. Uses counters and flip-flops.",
    fullDescription: "This project builds a simple Electronic Voting Machine using an Arduino, push buttons for candidates, and an LCD display. Each button press increments the corresponding candidate's vote counter (demonstrating flip-flop and counter logic). An admin button displays the final results with vote counts. It includes anti-tampering features like one-vote-per-press lockout, demonstrating practical digital logic in real-world applications.",
    subject: "Digital Electronics",
    price: 1899,
    image: "/images/voting-machine.png",
    technology: "Arduino",
    components: ["Arduino UNO", "16x2 LCD Display", "Push Buttons (x5)", "LEDs (x4)", "Buzzer", "10kΩ Resistors (x5)", "Potentiometer", "Breadboard", "Jumper Wires"],
    code: `// Electronic Voting Machine
#include <LiquidCrystal.h>
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

const int btn[] = {6, 7, 8, 9}; // 4 candidates
const int resultBtn = 10;
const int buzzer = 13;
int votes[] = {0, 0, 0, 0};
const char* names[] = {"Candidate A", "Candidate B", "Candidate C", "Candidate D"};
bool voted = false;

void setup() {
  lcd.begin(16, 2);
  for (int i = 0; i < 4; i++) pinMode(btn[i], INPUT_PULLUP);
  pinMode(resultBtn, INPUT_PULLUP);
  pinMode(buzzer, OUTPUT);
  Serial.begin(9600);
  lcd.print("  EVM Ready");
  lcd.setCursor(0, 1);
  lcd.print("Press to Vote");
}

void beep() {
  digitalWrite(buzzer, HIGH);
  delay(100);
  digitalWrite(buzzer, LOW);
}

void loop() {
  for (int i = 0; i < 4; i++) {
    if (digitalRead(btn[i]) == LOW && !voted) {
      votes[i]++;
      voted = true;
      beep();
      lcd.clear();
      lcd.print("Vote Recorded!");
      lcd.setCursor(0, 1);
      lcd.print(names[i]);
      Serial.print(names[i]);
      Serial.print(": ");
      Serial.println(votes[i]);
      delay(1500);
      lcd.clear();
      lcd.print("  EVM Ready");
      lcd.setCursor(0, 1);
      lcd.print("Press to Vote");
      voted = false;
    }
  }

  if (digitalRead(resultBtn) == LOW) {
    lcd.clear();
    lcd.print("== RESULTS ==");
    delay(1000);
    for (int i = 0; i < 4; i++) {
      lcd.clear();
      lcd.print(names[i]);
      lcd.setCursor(0, 1);
      lcd.print("Votes: ");
      lcd.print(votes[i]);
      delay(2000);
    }
  }
}`,
    featured: true,
  },
  {
    id: 27,
    title: "4-Bit Binary Counter Display",
    slug: "4-bit-binary-counter",
    description: "Counts from 0 to 15 in binary and displays on LEDs and a 7-segment display. Demonstrates binary counting principles.",
    fullDescription: "This project implements a 4-bit binary counter that counts from 0 (0000) to 15 (1111) and displays the count on four LEDs showing binary and a 7-segment display showing decimal. It demonstrates the fundamental concepts of binary number systems, counting circuits, and how digital systems represent data using binary digits.",
    subject: "Digital Electronics",
    price: 1999,
    image: "/images/binary-counter.png",
    technology: "Arduino",
    components: ["Arduino UNO", "7-Segment Display (Common Cathode)", "LEDs (x4)", "220Ω Resistors (x11)", "Push Button", "10kΩ Resistor", "Breadboard", "Jumper Wires"],
    code: `// 4-Bit Binary Counter with 7-Segment
const int ledPins[] = {2, 3, 4, 5}; // Binary LEDs
const int segPins[] = {6,7,8,9,10,11,12}; // a-g segments
const int buttonPin = A0;

// 7-segment patterns for 0-15 (a,b,c,d,e,f,g)
const byte segments[16][7] = {
  {1,1,1,1,1,1,0}, // 0
  {0,1,1,0,0,0,0}, // 1
  {1,1,0,1,1,0,1}, // 2
  {1,1,1,1,0,0,1}, // 3
  {0,1,1,0,0,1,1}, // 4
  {1,0,1,1,0,1,1}, // 5
  {1,0,1,1,1,1,1}, // 6
  {1,1,1,0,0,0,0}, // 7
  {1,1,1,1,1,1,1}, // 8
  {1,1,1,1,0,1,1}, // 9
  {1,1,1,0,1,1,1}, // A
  {0,0,1,1,1,1,1}, // b
  {1,0,0,1,1,1,0}, // C
  {0,1,1,1,1,0,1}, // d
  {1,0,0,1,1,1,1}, // E
  {1,0,0,0,1,1,1}, // F
};
int count = 0;

void setup() {
  for (int i = 0; i < 4; i++) pinMode(ledPins[i], OUTPUT);
  for (int i = 0; i < 7; i++) pinMode(segPins[i], OUTPUT);
  pinMode(buttonPin, INPUT_PULLUP);
  Serial.begin(9600);
}

void displayNumber(int n) {
  // Binary LEDs
  for (int i = 0; i < 4; i++) {
    digitalWrite(ledPins[i], (n >> i) & 1);
  }
  // 7-segment
  for (int i = 0; i < 7; i++) {
    digitalWrite(segPins[i], segments[n][i]);
  }
}

void loop() {
  displayNumber(count);
  Serial.print("Count: ");
  Serial.print(count);
  Serial.print(" Binary: ");
  for (int i=3; i>=0; i--) Serial.print((count>>i)&1);
  Serial.println();
  count = (count + 1) % 16;
  delay(1000);
}`,
    featured: false,
  },
  {
    id: 28,
    title: "Traffic Light Controller",
    slug: "traffic-light-controller",
    description: "Simulates a 4-way traffic light intersection with sequential timing logic. Demonstrates sequential circuits and state machines.",
    fullDescription: "This project simulates a real 4-way traffic intersection using RGB LEDs (Red, Yellow, Green) controlled by sequential timing logic. The Arduino acts as a state machine, cycling through traffic phases with proper timing for each direction. It includes a pedestrian crossing button that interrupts the normal sequence. This project demonstrates sequential logic, state machines, and timer circuits — key concepts in Digital Electronics.",
    subject: "Digital Electronics",
    price: 2199,
    image: "/images/traffic-light.png",
    technology: "Arduino",
    components: ["Arduino UNO", "Red LEDs (x4)", "Yellow LEDs (x4)", "Green LEDs (x4)", "Push Button", "220Ω Resistors (x12)", "10kΩ Resistor", "Breadboard", "Jumper Wires"],
    code: `// Traffic Light Controller - 4-Way
const int road1[] = {2, 3, 4};  // R, Y, G
const int road2[] = {5, 6, 7};
const int pedBtn = 8;
const int pedLed = 9;

int greenTime = 5000;
int yellowTime = 2000;

void setup() {
  for (int i = 0; i < 3; i++) {
    pinMode(road1[i], OUTPUT);
    pinMode(road2[i], OUTPUT);
  }
  pinMode(pedBtn, INPUT_PULLUP);
  pinMode(pedLed, OUTPUT);
  Serial.begin(9600);
  Serial.println("Traffic Controller Active");
}

void setLights(const int road[], bool r, bool y, bool g) {
  digitalWrite(road[0], r);
  digitalWrite(road[1], y);
  digitalWrite(road[2], g);
}

void loop() {
  // Phase 1: Road1 Green, Road2 Red
  Serial.println("Road 1: GREEN | Road 2: RED");
  setLights(road1, 0, 0, 1);
  setLights(road2, 1, 0, 0);
  delay(greenTime);

  // Check pedestrian
  if (digitalRead(pedBtn) == LOW) {
    Serial.println("PEDESTRIAN CROSSING");
    setLights(road1, 1, 0, 0);
    setLights(road2, 1, 0, 0);
    digitalWrite(pedLed, HIGH);
    delay(3000);
    digitalWrite(pedLed, LOW);
  }

  // Yellow transition
  Serial.println("Road 1: YELLOW");
  setLights(road1, 0, 1, 0);
  delay(yellowTime);

  // Phase 2: Road2 Green, Road1 Red
  Serial.println("Road 1: RED | Road 2: GREEN");
  setLights(road1, 1, 0, 0);
  setLights(road2, 0, 0, 1);
  delay(greenTime);

  Serial.println("Road 2: YELLOW");
  setLights(road2, 0, 1, 0);
  delay(yellowTime);
}`,
    featured: true,
  },
  {
    id: 29,
    title: "Digital Clock Using 7-Segment",
    slug: "digital-clock-7-segment",
    description: "A real-time digital clock displaying hours, minutes, and seconds on 7-segment displays. Demonstrates counters and multiplexing.",
    fullDescription: "This project builds a digital clock using an RTC (Real-Time Clock) module for accurate timekeeping and 7-segment displays for output. The Arduino reads the current time from the DS1307 RTC module and displays it using multiplexed 7-segment displays, rapidly switching between digits to create the illusion of simultaneous display. It demonstrates counter circuits, multiplexing, BCD encoding, and real-time clock interfacing.",
    subject: "Digital Electronics",
    price: 2799,
    image: "/images/digital-clock.png",
    technology: "Arduino",
    components: ["Arduino UNO", "DS1307 RTC Module", "4-Digit 7-Segment Display", "74HC595 Shift Register (x2)", "220Ω Resistors (x8)", "Push Buttons (x2)", "Breadboard", "Jumper Wires"],
    code: `// Digital Clock with RTC
// Simplified version using millis()
int hours = 12, minutes = 0, seconds = 0;
unsigned long lastTick = 0;

const int segPins[] = {2,3,4,5,6,7,8}; // a-g
const int digitPins[] = {9,10,11,12};

const byte numbers[10][7] = {
  {1,1,1,1,1,1,0}, {0,1,1,0,0,0,0},
  {1,1,0,1,1,0,1}, {1,1,1,1,0,0,1},
  {0,1,1,0,0,1,1}, {1,0,1,1,0,1,1},
  {1,0,1,1,1,1,1}, {1,1,1,0,0,0,0},
  {1,1,1,1,1,1,1}, {1,1,1,1,0,1,1}
};

void setup() {
  for (int i = 0; i < 7; i++) pinMode(segPins[i], OUTPUT);
  for (int i = 0; i < 4; i++) { pinMode(digitPins[i], OUTPUT); digitalWrite(digitPins[i], HIGH); }
  Serial.begin(9600);
}

void showDigit(int pos, int num) {
  for (int i = 0; i < 4; i++) digitalWrite(digitPins[i], HIGH);
  for (int i = 0; i < 7; i++) digitalWrite(segPins[i], numbers[num][i]);
  digitalWrite(digitPins[pos], LOW);
  delay(5);
}

void loop() {
  if (millis() - lastTick >= 1000) {
    lastTick = millis();
    seconds++;
    if (seconds >= 60) { seconds = 0; minutes++; }
    if (minutes >= 60) { minutes = 0; hours++; }
    if (hours >= 24) hours = 0;
    Serial.print(hours); Serial.print(":");
    Serial.print(minutes); Serial.print(":");
    Serial.println(seconds);
  }

  showDigit(0, hours / 10);
  showDigit(1, hours % 10);
  showDigit(2, minutes / 10);
  showDigit(3, minutes % 10);
}`,
    featured: false,
  },
  {
    id: 30,
    title: "ALU (Arithmetic Logic Unit) Model",
    slug: "alu-model",
    description: "A working ALU performing add, subtract, AND, OR, XOR operations on 4-bit inputs with LED output display.",
    fullDescription: "This project builds a simplified Arithmetic Logic Unit (ALU) — the core component of every processor. Using DIP switches for two 4-bit inputs and operation selection, the Arduino performs arithmetic (ADD, SUBTRACT) and logical (AND, OR, XOR, NOT) operations and displays results on LEDs and an LCD. It demonstrates combinational circuit design, binary arithmetic, and logic gate operations.",
    subject: "Digital Electronics",
    price: 2299,
    image: "/images/alu-model.png",
    technology: "Arduino",
    components: ["Arduino UNO", "DIP Switches (x2, 4-bit)", "16x2 LCD Display", "LEDs (x5)", "220Ω Resistors", "Push Buttons (x3)", "Breadboard", "Jumper Wires"],
    code: `// ALU - Arithmetic Logic Unit
#include <LiquidCrystal.h>
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

const int inputA[] = {A0, A1, A2, A3};
const int inputB[] = {6, 7, 8, 9};
const int opBtn = 10;
int operation = 0;
const char* opNames[] = {"ADD", "SUB", "AND", "OR", "XOR", "NOT A"};

void setup() {
  lcd.begin(16, 2);
  for (int i = 0; i < 4; i++) {
    pinMode(inputA[i], INPUT);
    pinMode(inputB[i], INPUT);
  }
  pinMode(opBtn, INPUT_PULLUP);
  Serial.begin(9600);
  lcd.print("ALU Ready");
}

int readInput(const int pins[]) {
  int val = 0;
  for (int i = 0; i < 4; i++) {
    if (digitalRead(pins[i])) val |= (1 << i);
  }
  return val;
}

void loop() {
  if (digitalRead(opBtn) == LOW) {
    operation = (operation + 1) % 6;
    delay(300);
  }

  int a = readInput(inputA);
  int b = readInput(inputB);
  int result = 0;

  switch (operation) {
    case 0: result = (a + b) & 0xF; break;
    case 1: result = (a - b) & 0xF; break;
    case 2: result = a & b; break;
    case 3: result = a | b; break;
    case 4: result = a ^ b; break;
    case 5: result = (~a) & 0xF; break;
  }

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Op: ");
  lcd.print(opNames[operation]);
  lcd.setCursor(0, 1);
  lcd.print(a); lcd.print(" "); lcd.print(opNames[operation]);
  lcd.print(" "); lcd.print(b); lcd.print("="); lcd.print(result);

  Serial.print(a); Serial.print(" ");
  Serial.print(opNames[operation]);
  Serial.print(" "); Serial.print(b);
  Serial.print(" = "); Serial.println(result);
  delay(200);
}`,
    featured: false,
  },
  {
    id: 31,
    title: "Digital Voltmeter",
    slug: "digital-voltmeter",
    description: "Measures DC voltage (0-25V) and displays on LCD using ADC conversion. Demonstrates analog-to-digital conversion.",
    fullDescription: "This project creates a digital voltmeter that can measure DC voltages from 0 to 25V using the Arduino's built-in 10-bit ADC (Analog-to-Digital Converter). A voltage divider scales down the input voltage to the Arduino's safe 0-5V range. The measured voltage is displayed on a 16x2 LCD with precision up to 0.01V. It demonstrates ADC principles, voltage dividers, display drivers, and digital measurement techniques.",
    subject: "Digital Electronics",
    price: 2099,
    image: "/images/digital-voltmeter.png",
    technology: "Arduino",
    components: ["Arduino UNO", "16x2 LCD Display", "100kΩ Resistor", "10kΩ Resistor", "Potentiometer", "Banana Jacks (x2)", "Breadboard", "Jumper Wires"],
    code: `// Digital Voltmeter (0-25V)
#include <LiquidCrystal.h>
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

const int voltPin = A0;
float R1 = 100000.0; // 100K
float R2 = 10000.0;  // 10K

void setup() {
  lcd.begin(16, 2);
  Serial.begin(9600);
  lcd.print("Digital Voltmeter");
  delay(1000);
}

void loop() {
  int rawADC = analogRead(voltPin);
  float vOut = (rawADC * 5.0) / 1023.0;
  float vIn = vOut * ((R1 + R2) / R2);

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("DC Voltmeter");
  lcd.setCursor(0, 1);
  lcd.print("V = ");
  lcd.print(vIn, 2);
  lcd.print(" V");

  Serial.print("ADC: ");
  Serial.print(rawADC);
  Serial.print(" | Voltage: ");
  Serial.print(vIn, 2);
  Serial.println(" V");
  delay(500);
}`,
    featured: false,
  },
  {
    id: 32,
    title: "Password Protected Door Lock",
    slug: "password-door-lock",
    description: "A digital door lock with keypad input and password verification. Demonstrates keypad interfacing and microcontroller logic.",
    fullDescription: "This project creates a password-protected electronic door lock using a 4x4 matrix keypad and a servo motor to control the lock mechanism. Users enter a 4-digit password on the keypad, and the Arduino verifies it against the stored code. Correct password activates the servo (unlocks), while wrong entries trigger a buzzer alarm. Includes features like password change and lockout after 3 failed attempts. Demonstrates matrix scanning, conditional logic, and practical digital security.",
    subject: "Digital Electronics",
    price: 2999,
    image: "/images/door-lock.png",
    technology: "Arduino",
    components: ["Arduino UNO", "4x4 Matrix Keypad", "Servo Motor (SG90)", "16x2 LCD Display", "Buzzer", "Green LED", "Red LED", "Breadboard", "Jumper Wires"],
    code: `// Password Protected Door Lock
#include <LiquidCrystal.h>
#include <Servo.h>
LiquidCrystal lcd(A0, A1, 2, 3, 4, 5);
Servo lock;

String password = "1234";
String input = "";
int attempts = 0;
const int buzzer = 13;
const int greenLed = 11;
const int redLed = 12;

// Simplified keypad reading
const int rows[] = {6, 7, 8, 9};
const int cols[] = {10, A2, A3, A4};
const char keys[4][4] = {
  {'1','2','3','A'},
  {'4','5','6','B'},
  {'7','8','9','C'},
  {'*','0','#','D'}
};

void setup() {
  lcd.begin(16, 2);
  lock.attach(A5);
  lock.write(0); // Locked
  pinMode(buzzer, OUTPUT);
  pinMode(greenLed, OUTPUT);
  pinMode(redLed, OUTPUT);
  for (int i=0; i<4; i++) { pinMode(rows[i], OUTPUT); digitalWrite(rows[i], HIGH); }
  for (int i=0; i<4; i++) pinMode(cols[i], INPUT_PULLUP);
  Serial.begin(9600);
  lcd.print("Enter Password:");
  digitalWrite(redLed, HIGH);
}

char getKey() {
  for (int r=0; r<4; r++) {
    digitalWrite(rows[r], LOW);
    for (int c=0; c<4; c++) {
      if (digitalRead(cols[c]) == LOW) {
        delay(200);
        digitalWrite(rows[r], HIGH);
        return keys[r][c];
      }
    }
    digitalWrite(rows[r], HIGH);
  }
  return 0;
}

void loop() {
  char key = getKey();
  if (key == 0) return;

  if (key == '#') { // Submit
    if (input == password) {
      lcd.clear(); lcd.print("ACCESS GRANTED!");
      digitalWrite(greenLed, HIGH);
      digitalWrite(redLed, LOW);
      lock.write(90); // Unlock
      delay(5000);
      lock.write(0);  // Re-lock
      digitalWrite(greenLed, LOW);
      digitalWrite(redLed, HIGH);
      attempts = 0;
    } else {
      attempts++;
      lcd.clear(); lcd.print("WRONG! Try ");
      lcd.print(3 - attempts);
      digitalWrite(buzzer, HIGH);
      delay(1000);
      digitalWrite(buzzer, LOW);
      if (attempts >= 3) {
        lcd.clear(); lcd.print("LOCKED OUT!");
        delay(10000);
        attempts = 0;
      }
    }
    input = "";
    lcd.clear(); lcd.print("Enter Password:");
  } else if (key == '*') {
    input = "";
    lcd.clear(); lcd.print("Enter Password:");
  } else {
    input += key;
    lcd.setCursor(0, 1);
    for (int i=0; i<input.length(); i++) lcd.print('*');
  }
}`,
    featured: false,
  },
  {
    id: 33,
    title: "4-Bit Full Adder & Subtractor",
    slug: "4-bit-adder-subtractor",
    description: "Performs binary addition and subtraction on 4-bit numbers with carry/borrow display. Demonstrates fundamental logic gates.",
    fullDescription: "This project implements a 4-bit full adder and subtractor using Arduino to simulate the behavior of cascaded logic gates. Two 4-bit numbers are input via DIP switches, and the operation (add/subtract) is selected with a toggle. The result, along with carry/borrow flags, is displayed on LEDs and an LCD. It demonstrates how logic gates (AND, OR, XOR) combine to form arithmetic circuits — the building blocks of every computer processor.",
    subject: "Digital Electronics",
    price: 1899,
    image: "/images/adder-subtractor.png",
    technology: "Arduino",
    components: ["Arduino UNO", "DIP Switches (x2, 4-bit)", "LEDs (x5 - result + carry)", "Toggle Switch", "16x2 LCD Display", "220Ω Resistors", "Breadboard", "Jumper Wires"],
    code: `// 4-Bit Full Adder & Subtractor
#include <LiquidCrystal.h>
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

const int inputA[] = {A0, A1, A2, A3};
const int inputB[] = {6, 7, 8, 9};
const int modePin = 10; // HIGH=Add, LOW=Sub
const int resultLeds[] = {A4, A5, 13, 0, 1}; // 4 bits + carry

void setup() {
  lcd.begin(16, 2);
  for (int i = 0; i < 4; i++) {
    pinMode(inputA[i], INPUT);
    pinMode(inputB[i], INPUT);
  }
  pinMode(modePin, INPUT_PULLUP);
  for (int i = 0; i < 5; i++) pinMode(resultLeds[i], OUTPUT);
  Serial.begin(9600);
  lcd.print("Adder/Subtractor");
}

void loop() {
  int a = 0, b = 0;
  for (int i = 0; i < 4; i++) {
    if (digitalRead(inputA[i])) a |= (1 << i);
    if (digitalRead(inputB[i])) b |= (1 << i);
  }

  bool addMode = digitalRead(modePin);
  int result;
  bool carry;

  if (addMode) {
    result = a + b;
    carry = result > 15;
  } else {
    result = a - b;
    carry = result < 0;
    if (carry) result = 16 + result; // 2's complement
  }

  result &= 0xF;
  for (int i = 0; i < 4; i++) {
    digitalWrite(resultLeds[i], (result >> i) & 1);
  }
  digitalWrite(resultLeds[4], carry);

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print(addMode ? "ADD: " : "SUB: ");
  lcd.print(a); lcd.print(addMode ? " + " : " - "); lcd.print(b);
  lcd.setCursor(0, 1);
  lcd.print("= "); lcd.print(result);
  lcd.print(carry ? (addMode ? " C=1" : " B=1") : "");

  delay(300);
}`,
    featured: false,
  },
  {
    id: 34,
    title: "Frequency Counter",
    slug: "frequency-counter",
    description: "Measures frequency of input signals up to 50kHz and displays on LCD. Demonstrates pulse counting and digital measurement.",
    fullDescription: "This project builds a digital frequency counter that measures the frequency of an input square wave signal by counting the number of pulses in a known time period. Using Arduino's interrupt capability, it provides accurate measurements up to 50kHz displayed on an LCD. The project demonstrates pulse counting, timer interrupts, period measurement, and digital signal analysis — essential concepts in Digital Electronics and instrumentation.",
    subject: "Digital Electronics",
    price: 2299,
    image: "/images/frequency-counter.png",
    technology: "Arduino",
    components: ["Arduino UNO", "16x2 LCD Display", "Signal Generator (555 Timer)", "BNC Connector", "10kΩ Resistor", "0.1µF Capacitor", "Breadboard", "Jumper Wires"],
    code: `// Frequency Counter
#include <LiquidCrystal.h>
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

const int signalPin = 3; // INT1
volatile unsigned long pulseCount = 0;
unsigned long lastMeasure = 0;
float frequency = 0;

void countPulse() {
  pulseCount++;
}

void setup() {
  lcd.begin(16, 2);
  pinMode(signalPin, INPUT);
  attachInterrupt(digitalPinToInterrupt(signalPin), countPulse, RISING);
  Serial.begin(9600);
  lcd.print("Freq Counter");
  delay(1000);
}

void loop() {
  if (millis() - lastMeasure >= 1000) {
    detachInterrupt(digitalPinToInterrupt(signalPin));
    frequency = pulseCount;
    pulseCount = 0;
    lastMeasure = millis();
    attachInterrupt(digitalPinToInterrupt(signalPin), countPulse, RISING);
  }

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Frequency:");
  lcd.setCursor(0, 1);
  if (frequency >= 1000) {
    lcd.print(frequency / 1000, 2);
    lcd.print(" kHz");
  } else {
    lcd.print(frequency, 0);
    lcd.print(" Hz");
  }

  Serial.print("Freq: ");
  Serial.print(frequency);
  Serial.println(" Hz");
  delay(500);
}`,
    featured: false,
  },
  {
    id: 35,
    title: "Automatic Street Light Controller",
    slug: "automatic-street-light",
    description: "Automatically turns street lights on at dusk and off at dawn using LDR and comparator logic.",
    fullDescription: "This project creates an automatic street lighting system using an LDR (Light Dependent Resistor) and comparator logic. When ambient light falls below a threshold (dusk), the system automatically turns on the street lights (LEDs). At dawn, when light levels increase, the lights turn off. The Arduino implements a comparator with hysteresis to prevent flickering near the threshold. It demonstrates comparator circuits, threshold logic, and practical automation using analog-to-digital concepts.",
    subject: "Digital Electronics",
    price: 1899,
    image: "/images/street-light.jpg",
    technology: "Arduino",
    components: ["Arduino UNO", "LDR Sensor", "LEDs (x6 - street lights)", "10kΩ Resistor", "220Ω Resistors (x6)", "Potentiometer (threshold adjust)", "Breadboard", "Jumper Wires"],
    code: `// Automatic Street Light Controller
const int ldrPin = A0;
const int potPin = A1; // Threshold adjust
const int leds[] = {2, 3, 4, 5, 6, 7};
const int numLeds = 6;
bool lightsOn = false;
int hysteresis = 30;

void setup() {
  for (int i = 0; i < numLeds; i++) {
    pinMode(leds[i], OUTPUT);
  }
  Serial.begin(9600);
  Serial.println("Street Light Controller");
}

void setLights(bool on) {
  for (int i = 0; i < numLeds; i++) {
    digitalWrite(leds[i], on);
  }
  lightsOn = on;
}

void loop() {
  int ldrValue = analogRead(ldrPin);
  int threshold = analogRead(potPin);
  int intensity = map(ldrValue, 0, 1023, 100, 0);

  // Comparator with hysteresis
  if (!lightsOn && ldrValue < (threshold - hysteresis)) {
    setLights(true);
    Serial.println("DUSK - Lights ON");
  } else if (lightsOn && ldrValue > (threshold + hysteresis)) {
    setLights(false);
    Serial.println("DAWN - Lights OFF");
  }

  Serial.print("Light: ");
  Serial.print(intensity);
  Serial.print("% | Threshold: ");
  Serial.print(map(threshold, 0, 1023, 0, 100));
  Serial.print("% | Lights: ");
  Serial.println(lightsOn ? "ON" : "OFF");
  delay(500);
}`,
    featured: false,
  },
  {
    id: 36,
    title: "Water Level Indicator",
    slug: "water-level-indicator",
    description: "Monitors and displays water tank level with 4 stages and overflow alarm. Uses comparator circuit logic.",
    fullDescription: "This project builds a water level monitoring system using simple probes (wires) at different heights in a water tank. The Arduino reads the probe signals (acting as comparators) and displays the water level on LEDs and an LCD with 4 levels: Low, Medium, High, and Full. When the tank is full, a buzzer alarm sounds. It demonstrates voltage comparator circuits, multi-level detection logic, and practical digital monitoring systems.",
    subject: "Digital Electronics",
    price: 1799,
    image: "/images/water-level.jpg",
    technology: "Arduino",
    components: ["Arduino UNO", "16x2 LCD Display", "Copper Probes (x5)", "LEDs (Green, Yellow, Orange, Red)", "Buzzer", "10kΩ Resistors (x4)", "220Ω Resistors (x4)", "Breadboard", "Jumper Wires"],
    code: `// Water Level Indicator
#include <LiquidCrystal.h>
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

const int probes[] = {A0, A1, A2, A3}; // Low to Full
const int leds[] = {6, 7, 8, 9}; // Green, Yellow, Orange, Red
const int buzzer = 10;
const char* levels[] = {"EMPTY", "LOW", "MEDIUM", "HIGH", "FULL"};

void setup() {
  lcd.begin(16, 2);
  for (int i = 0; i < 4; i++) {
    pinMode(probes[i], INPUT);
    pinMode(leds[i], OUTPUT);
  }
  pinMode(buzzer, OUTPUT);
  Serial.begin(9600);
  lcd.print("Water Level");
  delay(1000);
}

void loop() {
  int level = 0;
  for (int i = 0; i < 4; i++) {
    if (analogRead(probes[i]) > 500) level = i + 1;
  }

  // Update LEDs
  for (int i = 0; i < 4; i++) {
    digitalWrite(leds[i], i < level);
  }

  // Buzzer alarm when full
  digitalWrite(buzzer, level >= 4);

  // Display
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Water Level:");
  lcd.setCursor(0, 1);
  lcd.print(levels[level]);
  lcd.print(" ");
  for (int i = 0; i < 4; i++) lcd.print(i < level ? "|" : ".");

  int percent = level * 25;
  lcd.print(" ");
  lcd.print(percent);
  lcd.print("%");

  Serial.print("Level: ");
  Serial.print(levels[level]);
  Serial.print(" (");
  Serial.print(percent);
  Serial.println("%)");
  delay(500);
}`,
    featured: false,
  },
  {
    id: 37,
    title: "IR Based Object Counter",
    slug: "ir-object-counter",
    description: "Counts objects passing through an IR beam and displays the count. Uses IR sensor and digital counter logic.",
    fullDescription: "This project creates an automatic object counter using an IR transmitter-receiver pair. When an object passes between the IR LED and photodiode, the beam is broken and the counter increments. The Arduino detects beam interruptions, debounces the signal, and displays the running count on an LCD. It includes a reset button and speed calculation. Demonstrates IR sensor interfacing, digital counter logic, edge detection, and debouncing techniques.",
    subject: "Digital Electronics",
    price: 1999,
    image: "/images/ir-counter.jpg",
    technology: "Arduino",
    components: ["Arduino UNO", "IR LED", "IR Photodiode", "16x2 LCD Display", "Push Button (Reset)", "10kΩ Resistors (x2)", "220Ω Resistor", "Buzzer", "Breadboard", "Jumper Wires"],
    code: `// IR Based Object Counter
#include <LiquidCrystal.h>
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

const int irPin = A0;
const int resetBtn = 6;
const int buzzer = 7;
int count = 0;
bool objectPresent = false;
int threshold = 500;

void setup() {
  lcd.begin(16, 2);
  pinMode(resetBtn, INPUT_PULLUP);
  pinMode(buzzer, OUTPUT);
  Serial.begin(9600);
  lcd.print("Object Counter");
  lcd.setCursor(0, 1);
  lcd.print("Count: 0");
}

void loop() {
  int irValue = analogRead(irPin);

  // Detect object (beam broken)
  if (irValue < threshold && !objectPresent) {
    objectPresent = true;
    count++;
    digitalWrite(buzzer, HIGH);
    delay(50);
    digitalWrite(buzzer, LOW);
    Serial.print("Object #");
    Serial.println(count);
  }

  if (irValue >= threshold) {
    objectPresent = false;
  }

  // Reset
  if (digitalRead(resetBtn) == LOW) {
    count = 0;
    Serial.println("Counter Reset");
    delay(300);
  }

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Object Counter");
  lcd.setCursor(0, 1);
  lcd.print("Count: ");
  lcd.print(count);
  delay(100);
}`,
    featured: false,
  },
  {
    id: 38,
    title: "Digital Temperature Display",
    slug: "digital-temperature-display",
    description: "Reads temperature from a sensor, converts via ADC, and displays on a 7-segment display. Full ADC + display pipeline.",
    fullDescription: "This project creates a digital temperature display system using an LM35 temperature sensor, the Arduino's ADC for analog-to-digital conversion, and a 7-segment display for output. The analog temperature signal is sampled, quantized by the 10-bit ADC, and converted to degrees Celsius. It demonstrates the complete digital signal processing pipeline: analog sensing → ADC conversion → digital processing → display driving. Includes high/low temperature alarms.",
    subject: "Digital Electronics",
    price: 2099,
    image: "/images/digital-temp.jpg",
    technology: "Arduino",
    components: ["Arduino UNO", "LM35 Temperature Sensor", "4-Digit 7-Segment Display", "74HC595 Shift Register", "220Ω Resistors (x8)", "Buzzer", "LEDs (x2)", "Breadboard", "Jumper Wires"],
    code: `// Digital Temperature Display
#include <LiquidCrystal.h>
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

const int tempPin = A0;
const int buzzer = 8;
const int hotLed = 9;
const int coldLed = 10;
float highAlarm = 35.0;
float lowAlarm = 15.0;

void setup() {
  lcd.begin(16, 2);
  pinMode(buzzer, OUTPUT);
  pinMode(hotLed, OUTPUT);
  pinMode(coldLed, OUTPUT);
  Serial.begin(9600);
  lcd.print("Temp Display");
  delay(1000);
}

void loop() {
  // Read ADC and convert
  int rawADC = analogRead(tempPin);
  float voltage = rawADC * (5.0 / 1023.0);
  float tempC = voltage * 100.0; // LM35: 10mV/°C
  float tempF = (tempC * 9.0/5.0) + 32.0;

  // Alarms
  bool hot = tempC >= highAlarm;
  bool cold = tempC <= lowAlarm;
  digitalWrite(hotLed, hot);
  digitalWrite(coldLed, cold);
  digitalWrite(buzzer, hot || cold);

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Temp: ");
  lcd.print(tempC, 1);
  lcd.print((char)223);
  lcd.print("C");
  lcd.setCursor(0, 1);
  if (hot) lcd.print("!! TOO HOT !!");
  else if (cold) lcd.print("!! TOO COLD !!");
  else lcd.print("Status: Normal");

  Serial.print("ADC:");
  Serial.print(rawADC);
  Serial.print(" T:");
  Serial.print(tempC, 1);
  Serial.print("C / ");
  Serial.print(tempF, 1);
  Serial.println("F");
  delay(500);
}`,
    featured: false,
  },
  {
    id: 39,
    title: "LED Chaser (Running Light)",
    slug: "led-chaser-running-light",
    description: "Creates mesmerizing running LED patterns using shift register logic. Demonstrates shift register operations and sequential circuits.",
    fullDescription: "This project creates an LED chaser (knight rider/running light effect) using a 74HC595 shift register to control 8 LEDs with only 3 Arduino pins. Multiple patterns are available: chase, bounce, stack, random, and pulse. It demonstrates shift register operations, serial-to-parallel conversion, bit manipulation, and sequential circuit design. The project shows how shift registers expand the number of outputs a microcontroller can drive.",
    subject: "Digital Electronics",
    price: 1899,
    image: "/images/led-chaser.jpg",
    technology: "Arduino",
    components: ["Arduino UNO", "74HC595 Shift Register", "LEDs (x8)", "220Ω Resistors (x8)", "Push Button (Pattern)", "Potentiometer (Speed)", "Breadboard", "Jumper Wires"],
    code: `// LED Chaser with 74HC595 Shift Register
const int dataPin = 2;   // DS
const int clockPin = 3;  // SHCP
const int latchPin = 4;  // STCP
const int patternBtn = 5;
const int speedPot = A0;
int pattern = 0;
int pos = 0;
bool direction = true;

void setup() {
  pinMode(dataPin, OUTPUT);
  pinMode(clockPin, OUTPUT);
  pinMode(latchPin, OUTPUT);
  pinMode(patternBtn, INPUT_PULLUP);
  Serial.begin(9600);
  Serial.println("LED Chaser Ready");
}

void shiftOut595(byte data) {
  digitalWrite(latchPin, LOW);
  shiftOut(dataPin, clockPin, MSBFIRST, data);
  digitalWrite(latchPin, HIGH);
}

void loop() {
  if (digitalRead(patternBtn) == LOW) {
    pattern = (pattern + 1) % 4;
    delay(300);
    Serial.print("Pattern: ");
    Serial.println(pattern);
  }

  int speed = map(analogRead(speedPot), 0, 1023, 30, 300);
  byte leds = 0;

  switch (pattern) {
    case 0: // Chase
      leds = 1 << pos;
      pos = (pos + 1) % 8;
      break;
    case 1: // Bounce
      leds = 1 << pos;
      if (direction) pos++; else pos--;
      if (pos >= 7) direction = false;
      if (pos <= 0) direction = true;
      break;
    case 2: // Stack
      for (int i = 0; i <= pos; i++) leds |= (1 << i);
      pos = (pos + 1) % 8;
      break;
    case 3: // Random
      leds = random(0, 256);
      break;
  }

  shiftOut595(leds);
  delay(speed);
}`,
    featured: false,
  },
  // ==========================================
  // EMERGING & DISRUPTIVE TECHNOLOGIES (15)
  // ==========================================
  {
    id: 40, title: "Smart Street Light System", slug: "smart-street-light-system",
    description: "IoT-enabled smart street lights that auto-adjust brightness based on ambient light and motion detection.",
    fullDescription: "This IoT smart street light system uses LDR for ambient light sensing and PIR for motion detection. Lights dim when no movement is detected, saving energy. Data is sent to a cloud dashboard via WiFi for remote monitoring. Demonstrates IoT, sensor fusion, and energy-efficient automation.",
    subject: "Emerging and Disruptive Technologies", price: 1899, image: "/images/street-light.jpg", technology: "Arduino",
    components: ["Arduino UNO", "LDR Sensor", "PIR Motion Sensor", "LEDs (x6)", "Relay Module", "220Ω Resistors", "Breadboard", "Jumper Wires"],
    code: `// Smart Street Light System
const int ldr = A0, pir = 2;
const int leds[] = {3,4,5,6,7,8};
void setup() {
  for(int i=0;i<6;i++) pinMode(leds[i],OUTPUT);
  pinMode(pir,INPUT); Serial.begin(9600);
}
void loop() {
  int light = analogRead(ldr);
  bool motion = digitalRead(pir);
  int brightness = 0;
  if(light < 300) { // Dark
    brightness = motion ? 255 : 80; // Full if motion, dim otherwise
  }
  for(int i=0;i<6;i++) analogWrite(leds[i], brightness);
  Serial.print("Light:"); Serial.print(light);
  Serial.print(" Motion:"); Serial.println(motion);
  delay(500);
}`, featured: false,
  },
  {
    id: 41, title: "Home Automation via Bluetooth", slug: "home-automation-bluetooth",
    description: "Control home appliances (lights, fans, etc.) wirelessly via Bluetooth from a smartphone app.",
    fullDescription: "This project enables wireless control of up to 4 home appliances using a Bluetooth module (HC-05) and a smartphone app. The Arduino receives commands via Bluetooth serial and toggles relay channels. Includes manual override switches and status LED indicators. Demonstrates wireless communication, serial protocols, and practical IoT home automation.",
    subject: "Emerging and Disruptive Technologies", price: 2099, image: "/images/iot-home.png", technology: "Arduino",
    components: ["Arduino UNO", "HC-05 Bluetooth Module", "4-Channel Relay Module", "LEDs (x4)", "Push Buttons (x4)", "Resistors", "Breadboard", "Jumper Wires"],
    code: `// Home Automation via Bluetooth
char cmd;
const int relays[] = {2,3,4,5};
const int btns[] = {6,7,8,9};
bool state[] = {0,0,0,0};
void setup() {
  Serial.begin(9600);
  for(int i=0;i<4;i++){pinMode(relays[i],OUTPUT);pinMode(btns[i],INPUT_PULLUP);}
}
void loop() {
  if(Serial.available()) {
    cmd = Serial.read();
    if(cmd>='1'&&cmd<='4') {int i=cmd-'1'; state[i]=!state[i]; digitalWrite(relays[i],state[i]);}
    if(cmd=='0') for(int i=0;i<4;i++){state[i]=0;digitalWrite(relays[i],0);}
  }
  for(int i=0;i<4;i++) if(digitalRead(btns[i])==LOW){state[i]=!state[i];digitalWrite(relays[i],state[i]);delay(300);}
  delay(50);
}`, featured: false,
  },
  {
    id: 42, title: "IoT Based Home Automation", slug: "iot-home-automation",
    description: "Control and monitor home appliances from anywhere in the world via WiFi and a web dashboard using ESP32.",
    fullDescription: "This advanced IoT home automation system uses ESP32's WiFi to create a web server dashboard accessible from any browser. Control 4 appliances remotely, monitor real-time status, set schedules, and view power consumption estimates. Includes temperature/humidity monitoring. Demonstrates IoT protocols, web servers, REST APIs, and cloud connectivity.",
    subject: "Emerging and Disruptive Technologies", price: 3899, image: "/images/iot-home.png", technology: "ESP32",
    components: ["ESP32 DevKit", "4-Channel Relay Module", "DHT22 Sensor", "OLED Display", "Push Buttons (x4)", "LEDs", "Breadboard", "Jumper Wires"],
    code: `// IoT Home Automation - ESP32
#include <WiFi.h>
#include <WebServer.h>
const char* ssid = "YOUR_WIFI";
const char* pass = "YOUR_PASS";
WebServer server(80);
const int relays[] = {25,26,27,14};
bool state[] = {0,0,0,0};
void setup() {
  Serial.begin(115200);
  for(int i=0;i<4;i++){pinMode(relays[i],OUTPUT);digitalWrite(relays[i],HIGH);}
  WiFi.begin(ssid,pass);
  while(WiFi.status()!=WL_CONNECTED) delay(500);
  Serial.println(WiFi.localIP());
  server.on("/", [](){ server.send(200,"text/html","<h1>IoT Home</h1><a href='/toggle?r=0'>Dev1</a>"); });
  server.on("/toggle", [](){
    int r = server.arg("r").toInt();
    state[r]=!state[r]; digitalWrite(relays[r],!state[r]);
    server.send(200,"text/plain","OK");
  });
  server.begin();
}
void loop() { server.handleClient(); }`, featured: true,
  },
  {
    id: 43, title: "Smart Dustbin (Automatic Lid)", slug: "smart-dustbin-auto-lid",
    description: "An automatic dustbin that opens its lid when a hand is detected nearby using ultrasonic sensing.",
    fullDescription: "This smart dustbin uses an ultrasonic sensor to detect when someone's hand approaches. A servo motor automatically opens the lid, waits for disposal, then closes. Includes a fill-level indicator using another ultrasonic sensor inside. Demonstrates proximity sensing, servo control, and smart everyday automation.",
    subject: "Emerging and Disruptive Technologies", price: 2199, image: "/images/smart-dustbin.jpg", technology: "Arduino",
    components: ["Arduino UNO", "HC-SR04 Ultrasonic Sensors (x2)", "Servo Motor (SG90)", "LEDs (Green, Yellow, Red)", "Buzzer", "Breadboard", "Jumper Wires"],
    code: `// Smart Dustbin
#include <Servo.h>
Servo lid;
const int trigH=2,echoH=3,trigF=4,echoF=5;
const int buzz=6;
long getDistance(int trig,int echo){
  digitalWrite(trig,LOW);delayMicroseconds(2);
  digitalWrite(trig,HIGH);delayMicroseconds(10);
  digitalWrite(trig,LOW);
  return pulseIn(echo,HIGH)/58;
}
void setup(){
  lid.attach(9); lid.write(0);
  pinMode(trigH,OUTPUT);pinMode(echoH,INPUT);
  pinMode(trigF,OUTPUT);pinMode(echoF,INPUT);
  pinMode(buzz,OUTPUT); Serial.begin(9600);
}
void loop(){
  long hand=getDistance(trigH,echoH);
  long fill=getDistance(trigF,echoF);
  int fillPct=map(constrain(fill,3,30),30,3,0,100);
  if(hand<15){lid.write(120);delay(3000);lid.write(0);}
  if(fillPct>90) digitalWrite(buzz,HIGH); else digitalWrite(buzz,LOW);
  Serial.print("Fill:"); Serial.print(fillPct); Serial.println("%");
  delay(200);
}`, featured: false,
  },
  {
    id: 44, title: "Smart Irrigation System", slug: "smart-irrigation-system",
    description: "IoT-based automatic plant watering system that monitors soil moisture and waters plants when needed via ESP32.",
    fullDescription: "This smart irrigation system uses soil moisture sensors, temperature/humidity monitoring, and an ESP32 with WiFi to automate plant watering. When soil moisture drops below a threshold, the water pump activates automatically. Data is logged to a web dashboard. Supports multiple zones and scheduling. Demonstrates IoT agriculture, sensor networks, and automated control systems.",
    subject: "Emerging and Disruptive Technologies", price: 3799, image: "/images/smart-irrigation.png", technology: "ESP32",
    components: ["ESP32 DevKit", "Soil Moisture Sensors (x2)", "DHT22 Sensor", "Water Pump (5V)", "Relay Module", "OLED Display", "Breadboard", "Jumper Wires"],
    code: `// Smart Irrigation System - ESP32
#include <WiFi.h>
const int soilPin=34, pumpRelay=25;
const int threshold=40;
void setup(){
  Serial.begin(115200);
  pinMode(pumpRelay,OUTPUT);
  digitalWrite(pumpRelay,HIGH);
}
void loop(){
  int raw=analogRead(soilPin);
  int moisture=map(raw,4095,0,0,100);
  Serial.print("Moisture:"); Serial.print(moisture); Serial.println("%");
  if(moisture<threshold){
    Serial.println("Watering...");
    digitalWrite(pumpRelay,LOW); delay(5000);
    digitalWrite(pumpRelay,HIGH);
  }
  delay(10000);
}`, featured: true,
  },
  {
    id: 45, title: "Fire & Gas Detection System", slug: "fire-gas-detection",
    description: "Detects fire (flame) and gas leaks (LPG/smoke) with buzzer alarm and SMS alert capability.",
    fullDescription: "This safety system uses an MQ-2 gas sensor for smoke/LPG detection and a flame sensor for fire detection. When dangerous levels are detected, it triggers a loud buzzer, activates warning LEDs, and can send SMS alerts via GSM module. Displays real-time gas levels on LCD. Demonstrates sensor interfacing, threshold-based alerting, and safety system design.",
    subject: "Emerging and Disruptive Technologies", price: 1699, image: "/images/fire-gas.jpg", technology: "Arduino",
    components: ["Arduino UNO", "MQ-2 Gas Sensor", "Flame Sensor", "16x2 LCD", "Buzzer", "Red LED", "Green LED", "Relay Module", "Breadboard", "Jumper Wires"],
    code: `// Fire & Gas Detection System
#include <LiquidCrystal.h>
LiquidCrystal lcd(12,11,5,4,3,2);
const int gasPin=A0, flamePin=A1, buzz=6, redLed=7, greenLed=8;
void setup(){
  lcd.begin(16,2); pinMode(buzz,OUTPUT);
  pinMode(redLed,OUTPUT); pinMode(greenLed,OUTPUT);
  Serial.begin(9600); lcd.print("Safety Monitor");
  delay(2000);
}
void loop(){
  int gas=analogRead(gasPin), flame=analogRead(flamePin);
  bool gasAlert=gas>400, fireAlert=flame<200;
  lcd.clear(); lcd.setCursor(0,0);
  lcd.print("Gas:"); lcd.print(gas);
  lcd.print(" F:"); lcd.print(flame);
  lcd.setCursor(0,1);
  if(gasAlert||fireAlert){
    lcd.print(gasAlert?"GAS LEAK!":"FIRE!!");
    digitalWrite(buzz,HIGH); digitalWrite(redLed,HIGH); digitalWrite(greenLed,LOW);
  } else {
    lcd.print("Status: SAFE");
    digitalWrite(buzz,LOW); digitalWrite(redLed,LOW); digitalWrite(greenLed,HIGH);
  }
  delay(500);
}`, featured: false,
  },
  {
    id: 46, title: "Smart Energy Meter (IoT)", slug: "smart-energy-meter",
    description: "IoT-based energy meter that monitors real-time power consumption and sends data to a cloud dashboard via ESP32.",
    fullDescription: "This smart energy meter uses a current sensor (ACS712) to measure real-time power consumption and an ESP32 to send data to the cloud. View live power usage, daily/monthly consumption graphs, and get alerts for unusual usage. Calculates electricity bill automatically. Demonstrates IoT data logging, sensor calibration, and energy management.",
    subject: "Emerging and Disruptive Technologies", price: 3999, image: "/images/energy-meter.jpg", technology: "ESP32",
    components: ["ESP32 DevKit", "ACS712 Current Sensor", "OLED Display (0.96\")", "Voltage Sensor Module", "Buzzer", "LEDs", "Breadboard", "Jumper Wires"],
    code: `// Smart Energy Meter - ESP32
const int currentPin=34, voltagePin=35;
float kWh=0; unsigned long lastTime=0;
void setup(){
  Serial.begin(115200);
  lastTime=millis();
}
void loop(){
  int rawI=analogRead(currentPin);
  float current=abs((rawI-2048)*0.0122);
  float voltage=220.0;
  float power=voltage*current;
  unsigned long now=millis();
  kWh+=power*(now-lastTime)/3600000000.0;
  lastTime=now;
  Serial.print("I:"); Serial.print(current,2);
  Serial.print("A P:"); Serial.print(power,1);
  Serial.print("W Total:"); Serial.print(kWh,4);
  Serial.println("kWh");
  delay(1000);
}`, featured: false,
  },
  {
    id: 47, title: "Weather Monitoring System", slug: "weather-monitoring-system",
    description: "IoT weather station measuring temperature, humidity, pressure, and rainfall with cloud data logging via ESP32.",
    fullDescription: "This IoT weather station uses multiple sensors (DHT22, BMP280, rain sensor) to monitor weather conditions in real-time. Data is displayed on an OLED and uploaded to a cloud dashboard via WiFi. Supports historical data viewing and weather trend analysis. Demonstrates environmental monitoring, multi-sensor fusion, and IoT data visualization.",
    subject: "Emerging and Disruptive Technologies", price: 3899, image: "/images/weather-station.png", technology: "ESP32",
    components: ["ESP32 DevKit", "DHT22 Sensor", "BMP280 Pressure Sensor", "Rain Sensor Module", "OLED Display (0.96\")", "Breadboard", "Jumper Wires"],
    code: `// Weather Monitoring - ESP32
#include <Wire.h>
const int dhtPin=4, rainPin=34;
void setup(){
  Serial.begin(115200);
  Serial.println("Weather Station Ready");
}
void loop(){
  // Simulated readings
  float temp=25.0+random(-50,50)/10.0;
  float hum=60.0+random(-100,100)/10.0;
  float pres=1013.0+random(-20,20)/10.0;
  int rain=analogRead(rainPin);
  bool raining=rain<500;
  Serial.print("T:"); Serial.print(temp,1); Serial.print("C ");
  Serial.print("H:"); Serial.print(hum,1); Serial.print("% ");
  Serial.print("P:"); Serial.print(pres,1); Serial.print("hPa ");
  delay(5000);
}`, featured: false,
  },
  {
    id: 48, title: "RFID Based Attendance System", slug: "rfid-attendance-system",
    description: "Automated attendance marking using RFID cards/tags with LCD display and data logging.",
    fullDescription: "This project uses an RFID reader (RC522) to scan student/employee ID cards and automatically log attendance with timestamps. The LCD displays the person's name and status. Data can be exported to a computer via serial. Includes duplicate scan prevention and late-arrival marking. Demonstrates RFID technology, serial communication, and database management.",
    subject: "Emerging and Disruptive Technologies", price: 1999, image: "/images/rfid-attendance.png", technology: "Arduino",
    components: ["Arduino UNO", "MFRC522 RFID Reader", "RFID Cards/Tags (x5)", "16x2 LCD Display", "Buzzer", "Green LED", "Red LED", "Breadboard", "Jumper Wires"],
    code: `// RFID Attendance System
#include <SPI.h>
#include <MFRC522.h>
#include <LiquidCrystal.h>
MFRC522 rfid(10, 9);
LiquidCrystal lcd(A0,A1,2,3,4,5);
const int buzz=6, gLed=7, rLed=8;
String knownUIDs[] = {"A1B2C3D4", "E5F6A7B8"};
String names[] = {"Student A", "Student B"};
int count = 0;
void setup() {
  SPI.begin(); rfid.PCD_Init();
  lcd.begin(16,2); Serial.begin(9600);
  pinMode(buzz,OUTPUT); pinMode(gLed,OUTPUT); pinMode(rLed,OUTPUT);
  lcd.print("Scan Your Card");
}
void loop() {
  if (!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial()) return;
  String uid = "";
  for (byte i=0; i<rfid.uid.size; i++) uid += String(rfid.uid.uidByte[i], HEX);
  uid.toUpperCase();
  bool found = false;
  for (int i=0; i<2; i++) {
    if (uid == knownUIDs[i]) {
      found = true; count++;
      lcd.clear(); lcd.print(names[i]);
      lcd.setCursor(0,1); lcd.print("PRESENT #"); lcd.print(count);
      digitalWrite(gLed,HIGH); tone(buzz,1000,200);
      Serial.print(names[i]); Serial.println(" - Present");
      delay(2000); digitalWrite(gLed,LOW);
      break;
    }
  }
  if (!found) {
    lcd.clear(); lcd.print("Unknown Card!");
    digitalWrite(rLed,HIGH); tone(buzz,500,500);
    delay(2000); digitalWrite(rLed,LOW);
  }
  lcd.clear(); lcd.print("Scan Your Card");
  rfid.PICC_HaltA();
}`, featured: true,
  },
  {
    id: 49, title: "Biometric Attendance System", slug: "biometric-attendance-system",
    description: "Fingerprint-based attendance system with OLED display, buzzer feedback, and data logging via ESP32.",
    fullDescription: "This advanced biometric system uses a fingerprint sensor (R307) for secure attendance marking. Enrolled fingerprints are stored in the sensor's memory. When a finger is scanned, the system identifies the person and logs their attendance with a timestamp on the OLED display. ESP32 enables WiFi data upload to a cloud dashboard. Demonstrates biometric authentication, IoT data logging, and secure access systems.",
    subject: "Emerging and Disruptive Technologies", price: 5499, image: "/images/biometric.jpg", technology: "ESP32",
    components: ["ESP32 DevKit", "R307 Fingerprint Sensor", "OLED Display (0.96\")", "Buzzer", "Green LED", "Red LED", "Push Buttons (x2)", "Breadboard", "Jumper Wires"],
    code: `// Biometric Attendance - ESP32 (Simplified)
const int fps_rx=16, fps_tx=17;
const int buzz=25, gLed=26, rLed=27;
int attendanceCount = 0;
void setup() {
  Serial.begin(115200);
  Serial2.begin(57600, SERIAL_8N1, fps_rx, fps_tx);
  pinMode(buzz,OUTPUT); pinMode(gLed,OUTPUT); pinMode(rLed,OUTPUT);
  Serial.println("Biometric System Ready");
  Serial.println("Place finger on sensor...");
}
void loop() {
  // Simplified - real implementation uses Adafruit_Fingerprint library
  if (Serial2.available()) {
    int id = Serial2.read();
    if (id > 0 && id < 128) {
      attendanceCount++;
      Serial.print("ID #"); Serial.print(id);
      Serial.print(" - PRESENT (Total: "); Serial.print(attendanceCount); Serial.println(")");
      digitalWrite(gLed,HIGH); tone(buzz,1000,200);
      delay(2000); digitalWrite(gLed,LOW);
    } else {
      Serial.println("Unknown fingerprint!");
      digitalWrite(rLed,HIGH); tone(buzz,400,500);
      delay(2000); digitalWrite(rLed,LOW);
    }
  }
  delay(100);
}`, featured: false,
  },
  {
    id: 50, title: "IoT Water Level Monitor", slug: "iot-water-level-monitor",
    description: "Remotely monitor water tank levels via WiFi with ESP32 and get alerts when levels are critical.",
    fullDescription: "This IoT water level monitor uses an ultrasonic sensor to measure water level in a tank and an ESP32 to transmit data to a web dashboard via WiFi. Users can check real-time water levels on any browser, receive low-level and overflow alerts, and view historical fill patterns. Demonstrates IoT remote monitoring, data visualization, and alert systems.",
    subject: "Emerging and Disruptive Technologies", price: 3399, image: "/images/water-level.jpg", technology: "ESP32",
    components: ["ESP32 DevKit", "HC-SR04 Ultrasonic Sensor", "OLED Display", "Buzzer", "LEDs (x3)", "Breadboard", "Jumper Wires"],
    code: `// IoT Water Level Monitor - ESP32
#include <WiFi.h>
const int trig=5, echo=18, buzz=25;
long getDistance() {
  digitalWrite(trig,LOW); delayMicroseconds(2);
  digitalWrite(trig,HIGH); delayMicroseconds(10);
  digitalWrite(trig,LOW);
  return pulseIn(echo,HIGH)/58;
}
void setup() {
  Serial.begin(115200);
  pinMode(trig,OUTPUT); pinMode(echo,INPUT); pinMode(buzz,OUTPUT);
}
void loop() {
  long dist = getDistance();
  int level = map(constrain(dist,3,30),30,3,0,100);
  Serial.print("Level: "); Serial.print(level); Serial.println("%");
  if(level < 10) { digitalWrite(buzz,HIGH); Serial.println("LOW ALERT!"); }
  else if(level > 95) { digitalWrite(buzz,HIGH); Serial.println("OVERFLOW!"); }
  else digitalWrite(buzz,LOW);
  delay(5000);
}`, featured: false,
  },
  {
    id: 51, title: "Smart Parking System", slug: "smart-parking-system",
    description: "Detects available parking spots using IR sensors and displays availability on LCD with servo barrier gate.",
    fullDescription: "This smart parking system uses IR sensors at each parking bay to detect vehicle presence. An LCD displays available spots in real-time. A servo-controlled barrier gate opens when a spot is available and closes when full. Entry/exit counting tracks occupancy. Demonstrates sensor arrays, automation, display systems, and practical IoT infrastructure.",
    subject: "Emerging and Disruptive Technologies", price: 3499, image: "/images/smart-parking.png", technology: "Arduino",
    components: ["Arduino UNO", "IR Sensors (x4)", "Servo Motor (SG90)", "16x2 LCD Display", "Green LED", "Red LED", "Buzzer", "Breadboard", "Jumper Wires"],
    code: `// Smart Parking System
#include <LiquidCrystal.h>
#include <Servo.h>
LiquidCrystal lcd(12,11,5,4,3,2);
Servo gate;
const int ir[] = {6,7,8,9};
const int totalSpots = 4;
void setup() {
  lcd.begin(16,2); gate.attach(10);
  gate.write(0);
  for(int i=0;i<4;i++) pinMode(ir[i],INPUT);
  Serial.begin(9600);
}
void loop() {
  int occupied = 0;
  for(int i=0;i<4;i++) if(digitalRead(ir[i])==LOW) occupied++;
  int available = totalSpots - occupied;
  lcd.clear(); lcd.setCursor(0,0);
  lcd.print("Parking Status:");
  lcd.setCursor(0,1);
  lcd.print("Free: "); lcd.print(available); lcd.print("/"); lcd.print(totalSpots);
  if(available > 0) gate.write(90); else gate.write(0);
  Serial.print("Available: "); Serial.println(available);
  delay(1000);
}`, featured: false,
  },
  {
    id: 52, title: "Voice Controlled Home Automation", slug: "voice-controlled-home",
    description: "Control home appliances using voice commands via ESP32 with Google Assistant or Alexa integration.",
    fullDescription: "This project enables voice control of home appliances using ESP32 and cloud IoT platforms. Integrates with Google Assistant or Alexa for natural language commands like 'turn on kitchen light'. Uses MQTT protocol for reliable communication. Controls up to 4 appliances with voice, app, and manual switch options. Demonstrates cloud IoT, voice AI integration, and smart home ecosystems.",
    subject: "Emerging and Disruptive Technologies", price: 5499, image: "/images/iot-home.png", technology: "ESP32",
    components: ["ESP32 DevKit", "4-Channel Relay Module", "Push Buttons (x4)", "LEDs (x4)", "OLED Display", "Breadboard", "Jumper Wires"],
    code: `// Voice Controlled Home - ESP32
#include <WiFi.h>
const char* ssid = "YOUR_WIFI";
const char* pass = "YOUR_PASS";
const int relays[] = {25,26,27,14};
bool state[] = {0,0,0,0};
String deviceNames[] = {"Light","Fan","AC","TV"};
void setup() {
  Serial.begin(115200);
  for(int i=0;i<4;i++){pinMode(relays[i],OUTPUT);digitalWrite(relays[i],HIGH);}
  WiFi.begin(ssid,pass);
  while(WiFi.status()!=WL_CONNECTED) delay(500);
  Serial.print("IP: "); Serial.println(WiFi.localIP());
  Serial.println("Voice Control Ready!");
}
void toggle(int dev) {
  state[dev]=!state[dev];
  digitalWrite(relays[dev],!state[dev]);
  Serial.print(deviceNames[dev]); Serial.println(state[dev]?" ON":" OFF");
}
void loop() {
  if(Serial.available()) {
    String cmd = Serial.readStringUntil('\n');
    cmd.toLowerCase();
    for(int i=0;i<4;i++) {
      String name = deviceNames[i]; name.toLowerCase();
      if(cmd.indexOf(name)>=0) toggle(i);
    }
  }
  delay(100);
}`, featured: true,
  },
  {
    id: 53, title: "Smart Health Monitoring System", slug: "smart-health-monitor",
    description: "Monitors heart rate, SpO2, and body temperature in real-time with IoT cloud dashboard via ESP32.",
    fullDescription: "This health monitoring system uses a MAX30102 pulse oximeter sensor for heart rate and SpO2 measurement, and an LM35 for body temperature. Data is displayed on an OLED screen and uploaded to a cloud dashboard via ESP32 WiFi. Includes abnormal value alerts and historical tracking. Demonstrates biomedical IoT, real-time sensor processing, and health informatics.",
    subject: "Emerging and Disruptive Technologies", price: 5199, image: "/images/health-monitor.jpg", technology: "ESP32",
    components: ["ESP32 DevKit", "MAX30102 Pulse Oximeter", "LM35 Temperature Sensor", "OLED Display (0.96\")", "Buzzer", "LEDs (x2)", "Breadboard", "Jumper Wires"],
    code: `// Smart Health Monitor - ESP32
const int tempPin = 34;
const int buzz = 25;
void setup() {
  Serial.begin(115200);
  pinMode(buzz, OUTPUT);
  Serial.println("Health Monitor Ready");
  Serial.println("Place finger on sensor...");
}
void loop() {
  // Simulated readings (real uses MAX30102 library)
  int heartRate = 70 + random(-5, 10);
  int spo2 = 97 + random(-2, 3);
  float rawTemp = analogRead(tempPin);
  float tempC = (rawTemp * 3.3 / 4095.0) * 100.0;
  Serial.print("HR: "); Serial.print(heartRate); Serial.print(" bpm | ");
  Serial.print("SpO2: "); Serial.print(spo2); Serial.print("% | ");
  Serial.print("Temp: "); Serial.print(tempC,1); Serial.println("C");
  if(heartRate>100||heartRate<50||spo2<90) {
    Serial.println("!! ABNORMAL - CHECK PATIENT !!");
    digitalWrite(buzz,HIGH); delay(500); digitalWrite(buzz,LOW);
  }
  delay(2000);
}`, featured: false,
  },
  {
    id: 54, title: "Automatic Plant Watering System", slug: "auto-plant-watering",
    description: "A simple automatic plant watering system using soil moisture sensor and relay-controlled water pump.",
    fullDescription: "This beginner-friendly project automatically waters plants when soil moisture drops below a set threshold. A soil moisture sensor continuously monitors the soil, and when it's too dry, a relay activates a small water pump. An LCD shows current moisture level and pump status. Includes a manual override button and adjustable threshold via potentiometer. Demonstrates sensor-based automation and practical IoT for agriculture.",
    subject: "Emerging and Disruptive Technologies", price: 1999, image: "/images/smart-irrigation.png", technology: "Arduino",
    components: ["Arduino UNO", "Soil Moisture Sensor", "5V Water Pump", "Relay Module", "16x2 LCD Display", "Potentiometer", "Push Button", "Breadboard", "Jumper Wires"],
    code: `// Automatic Plant Watering
#include <LiquidCrystal.h>
LiquidCrystal lcd(12,11,5,4,3,2);
const int soilPin=A0, potPin=A1, pump=6, btn=7;
void setup() {
  lcd.begin(16,2); pinMode(pump,OUTPUT);
  pinMode(btn,INPUT_PULLUP); Serial.begin(9600);
  digitalWrite(pump,HIGH); // Relay off
  lcd.print("Plant Watering");
  delay(1000);
}
void loop() {
  int soil = analogRead(soilPin);
  int moisture = map(soil, 1023, 0, 0, 100);
  int threshold = map(analogRead(potPin), 0, 1023, 10, 90);
  bool manualWater = digitalRead(btn) == LOW;
  bool needsWater = moisture < threshold;
  digitalWrite(pump, (needsWater || manualWater) ? LOW : HIGH);
  lcd.clear(); lcd.setCursor(0,0);
  lcd.print("Moisture: "); lcd.print(moisture); lcd.print("%");
  lcd.setCursor(0,1);
  lcd.print(needsWater ? "WATERING..." : manualWater ? "MANUAL ON" : "OK (>"); 
  if(!needsWater && !manualWater) { lcd.print(threshold); lcd.print("%)"); }
  Serial.print("M:"); Serial.print(moisture);
  Serial.print("% T:"); Serial.print(threshold); Serial.println("%");
  delay(1000);
}`, featured: false,
  },
  // ==========================================
  // SEMICONDUCTOR PHYSICS (5 new)
  // ==========================================
  {
    id: 55, title: "PN Junction Diode Characteristics", slug: "pn-junction-diode",
    description: "Plot forward and reverse bias V-I characteristics of a PN junction diode with real-time measurements.",
    fullDescription: "This project measures and plots the V-I characteristics of a PN junction diode in both forward and reverse bias. A potentiometer varies the applied voltage while the Arduino's ADC measures voltage and current. Results show the exponential forward curve and reverse saturation current. Demonstrates barrier potential, depletion region, and exponential I-V relationship.",
    subject: "Semiconductor Physics", price: 1899, image: "/images/pn-junction.png", technology: "Arduino",
    components: ["Arduino UNO", "1N4007 Silicon Diode", "16x2 LCD Display", "10kΩ Potentiometer", "1kΩ Resistor", "220Ω Resistors", "Breadboard", "Jumper Wires"],
    code: `// PN Junction Diode V-I Characteristics
#include <LiquidCrystal.h>
LiquidCrystal lcd(12,11,5,4,3,2);
const int vIn=A0, vOut=A1;
const float Rsense=1000.0;
void setup() {
  lcd.begin(16,2); Serial.begin(9600);
  Serial.println("V_applied(V),V_diode(V),I_diode(mA)");
  lcd.print("PN Junction"); lcd.setCursor(0,1); lcd.print("V-I Plotter");
  delay(2000);
}
void loop() {
  float vApplied = analogRead(vIn)*5.0/1023.0;
  float vAfter = analogRead(vOut)*5.0/1023.0;
  float vDiode = vApplied-vAfter;
  float iDiode = (vAfter/Rsense)*1000.0;
  lcd.clear(); lcd.setCursor(0,0);
  lcd.print("Vd="); lcd.print(vDiode,2); lcd.print("V");
  lcd.setCursor(0,1);
  lcd.print("Id="); lcd.print(iDiode,2); lcd.print("mA");
  Serial.print(vApplied,3); Serial.print(",");
  Serial.print(vDiode,3); Serial.print(",");
  Serial.println(iDiode,3);
  delay(300);
}`, featured: true,
  },
  {
    id: 56, title: "Zener Diode Voltage Regulator", slug: "zener-voltage-regulator",
    description: "Demonstrates Zener breakdown and voltage regulation with varying load and input voltage.",
    fullDescription: "This project demonstrates the Zener diode's voltage regulation capability by measuring output voltage stability as input voltage and load resistance vary. The Arduino monitors input voltage, Zener voltage, and load current. Results show constant output voltage after breakdown. Demonstrates Zener breakdown, voltage regulation, load/line regulation in semiconductor physics.",
    subject: "Semiconductor Physics", price: 1999, image: "/images/pn-junction.png", technology: "Arduino",
    components: ["Arduino UNO", "5.1V Zener Diode", "16x2 LCD Display", "10kΩ Potentiometers (x2)", "470Ω Series Resistor", "Load Resistors (1kΩ, 2.2kΩ, 4.7kΩ)", "Breadboard", "Jumper Wires"],
    code: `// Zener Diode Voltage Regulator
#include <LiquidCrystal.h>
LiquidCrystal lcd(12,11,5,4,3,2);
const int vInPin=A0, vZenerPin=A1;
const float Rs=470.0;
void setup() {
  lcd.begin(16,2); Serial.begin(9600);
  lcd.print("Zener Regulator"); delay(2000);
  Serial.println("Vin(V),Vz(V),Iz(mA)");
}
void loop() {
  float vIn=analogRead(vInPin)*5.0/1023.0*3.0;
  float vZ=analogRead(vZenerPin)*5.0/1023.0;
  float iZ=((vIn-vZ)/Rs)*1000.0;
  bool reg=vZ>4.5&&vZ<5.5;
  lcd.clear(); lcd.setCursor(0,0);
  lcd.print("Vin="); lcd.print(vIn,1); lcd.print(" Vz="); lcd.print(vZ,2);
  lcd.setCursor(0,1);
  lcd.print("Iz="); lcd.print(iZ,1); lcd.print("mA "); lcd.print(reg?"REG":"OFF");
  Serial.print(vIn,2); Serial.print(","); Serial.print(vZ,3); Serial.print(","); Serial.println(iZ,2);
  delay(500);
}`, featured: false,
  },
  {
    id: 57, title: "BJT Transistor Characteristics (CE Mode)", slug: "bjt-characteristics-ce",
    description: "Plots input and output characteristics of a BJT in Common Emitter mode with current gain calculation.",
    fullDescription: "This project measures the input (Ib vs Vbe) and output (Ic vs Vce) characteristics of a BJT transistor in Common Emitter configuration. Potentiometers control base and collector voltages. The Arduino calculates current gain (β/hFE) in real-time. Demonstrates bipolar junction transistor operation, current amplification, and saturation/active/cutoff regions.",
    subject: "Semiconductor Physics", price: 2499, image: "/images/pn-junction.png", technology: "Arduino",
    components: ["Arduino UNO", "BC547 NPN Transistor", "16x2 LCD Display", "10kΩ Potentiometers (x2)", "100kΩ Base Resistor", "1kΩ Collector Resistor", "Breadboard", "Jumper Wires"],
    code: `// BJT CE Characteristics
#include <LiquidCrystal.h>
LiquidCrystal lcd(12,11,5,4,3,2);
const int vbPin=A0, vcPin=A1, ibPin=A2;
const float Rb=100000.0, Rc=1000.0;
void setup() {
  lcd.begin(16,2); Serial.begin(9600);
  lcd.print("BJT CE Mode"); delay(2000);
  Serial.println("Vbe(V),Ib(uA),Vce(V),Ic(mA),Beta");
}
void loop() {
  float vb=analogRead(vbPin)*5.0/1023.0;
  float vbe=analogRead(ibPin)*5.0/1023.0;
  float vc=analogRead(vcPin)*5.0/1023.0;
  float ib=((vb-vbe)/Rb)*1000000.0;
  float ic=((5.0-vc)/Rc)*1000.0;
  float beta=(ib>0.1)?(ic*1000.0/ib):0;
  lcd.clear(); lcd.setCursor(0,0);
  lcd.print("Vbe="); lcd.print(vbe,2); lcd.print(" Ib="); lcd.print(ib,0); lcd.print("u");
  lcd.setCursor(0,1);
  lcd.print("Ic="); lcd.print(ic,1); lcd.print("mA B="); lcd.print(beta,0);
  Serial.print(vbe,3); Serial.print(","); Serial.print(ib,1); Serial.print(",");
  Serial.print(vc,3); Serial.print(","); Serial.print(ic,2); Serial.print(","); Serial.println(beta,0);
  delay(500);
}`, featured: false,
  },
  {
    id: 58, title: "MOSFET Characteristics & Amplifier", slug: "mosfet-characteristics",
    description: "Measures MOSFET transfer and output characteristics and demonstrates voltage amplification.",
    fullDescription: "This project explores MOSFET operation by measuring transfer (Id vs Vgs) and output (Id vs Vds) characteristics. A potentiometer varies the gate voltage to demonstrate threshold voltage and saturation. Also configures the MOSFET as a common-source amplifier. Demonstrates field-effect transistor physics, threshold voltage, and channel formation.",
    subject: "Semiconductor Physics", price: 1799, image: "/images/pn-junction.png", technology: "Arduino",
    components: ["Arduino UNO", "IRF540N N-Channel MOSFET", "16x2 LCD Display", "10kΩ Potentiometers (x2)", "100Ω Drain Resistor", "10kΩ Gate Resistor", "Breadboard", "Jumper Wires"],
    code: `// MOSFET Characteristics
#include <LiquidCrystal.h>
LiquidCrystal lcd(12,11,5,4,3,2);
const int vgsPin=A0, vdsPin=A1, idPin=A2;
const float Rd=100.0;
void setup() {
  lcd.begin(16,2); Serial.begin(9600);
  lcd.print("MOSFET Analyzer"); delay(2000);
  Serial.println("Vgs(V),Vds(V),Id(mA),Region");
}
void loop() {
  float vgs=analogRead(vgsPin)*5.0/1023.0;
  float vds=analogRead(vdsPin)*5.0/1023.0;
  float vRd=analogRead(idPin)*5.0/1023.0;
  float id=(vRd/Rd)*1000.0;
  String region;
  if(vgs<2.0) region="CUTOFF";
  else if(vds<(vgs-2.0)) region="LINEAR";
  else region="SATUR";
  lcd.clear(); lcd.setCursor(0,0);
  lcd.print("Vgs="); lcd.print(vgs,2); lcd.print(" Id="); lcd.print(id,1);
  lcd.setCursor(0,1);
  lcd.print("Vds="); lcd.print(vds,2); lcd.print(" "); lcd.print(region);
  Serial.print(vgs,3); Serial.print(","); Serial.print(vds,3); Serial.print(",");
  Serial.print(id,2); Serial.print(","); Serial.println(region);
  delay(500);
}`, featured: false,
  },
  {
    id: 59, title: "Solar Cell Characteristics & Efficiency", slug: "solar-cell-efficiency",
    description: "Measures solar cell V-I curve, maximum power point, and conversion efficiency under different light.",
    fullDescription: "This project characterizes a solar cell by measuring its V-I curve under different light conditions. A variable load sweeps from short-circuit current to open-circuit voltage. The Arduino calculates fill factor, maximum power point, and efficiency. Demonstrates photovoltaic effect, semiconductor junction under illumination, and solar energy principles.",
    subject: "Semiconductor Physics", price: 2199, image: "/images/solar-tracker.png", technology: "Arduino",
    components: ["Arduino UNO", "6V/1W Solar Panel", "16x2 LCD Display", "10kΩ Potentiometer", "1Ω Current Sense Resistor", "LDR", "220Ω Resistors", "Breadboard", "Jumper Wires"],
    code: `// Solar Cell V-I & Efficiency
#include <LiquidCrystal.h>
LiquidCrystal lcd(12,11,5,4,3,2);
const int vPin=A0, iPin=A1, ldrPin=A2;
const float Rsense=1.0;
float maxPower=0;
void setup() {
  lcd.begin(16,2); Serial.begin(9600);
  lcd.print("Solar Cell Test"); delay(2000);
  Serial.println("V(V),I(mA),P(mW),Light(%)");
}
void loop() {
  float v=analogRead(vPin)*5.0/1023.0;
  float vI=analogRead(iPin)*5.0/1023.0;
  float current=(vI/Rsense)*1000.0;
  float power=v*current;
  int light=map(analogRead(ldrPin),0,1023,0,100);
  if(power>maxPower) maxPower=power;
  lcd.clear(); lcd.setCursor(0,0);
  lcd.print(v,2); lcd.print("V "); lcd.print(current,0); lcd.print("mA "); lcd.print(power,0); lcd.print("mW");
  lcd.setCursor(0,1);
  lcd.print("MPP:"); lcd.print(maxPower,0); lcd.print("mW L:"); lcd.print(light); lcd.print("%");
  Serial.print(v,3); Serial.print(","); Serial.print(current,1); Serial.print(",");
  Serial.print(power,1); Serial.print(","); Serial.println(light);
  delay(500);
}`, featured: true,
  },
];

export const categories = [
  "Emerging and Disruptive Technologies",
  "Engineering Physics",
  "Digital Electronics",
  "Semiconductor Physics",
];

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

export const getProjectsBySubject = (subject: string): Project[] =>
  projects.filter((p) => p.subject === subject);

export const getFeaturedProjects = (): Project[] =>
  projects.filter((p) => p.featured);
