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
    price: 299,
    image: "/images/rain-alarm.jpg",
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
    price: 499,
    image: "/images/home-automation.jpg",
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
    price: 249,
    image: "/images/clap-switch.jpg",
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
    price: 349,
    image: "/images/temperature-monitor.jpg",
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
    price: 399,
    image: "/images/smart-dustbin.jpg",
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
    price: 599,
    image: "/images/line-follower.jpg",
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
    price: 449,
    image: "/images/plant-monitor.jpg",
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
    price: 349,
    image: "/images/gas-detector.jpg",
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
    price: 549,
    image: "/images/solar-tracker.jpg",
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
    price: 199,
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
    price: 379,
    image: "/images/fire-alarm.jpg",
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
    price: 649,
    image: "/images/bt-car.jpg",
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
];

export const categories = [
  "Engineering Physics",
  "Digital Electronics",
  "Semiconductor Physics",
  "Emerging and Disruptive Technologies",
];

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

export const getProjectsBySubject = (subject: string): Project[] =>
  projects.filter((p) => p.subject === subject);

export const getFeaturedProjects = (): Project[] =>
  projects.filter((p) => p.featured);
