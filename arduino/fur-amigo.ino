#include <Arduino.h>
#include <DFRobotDFPlayerMini.h>
#include <SoftwareSerial.h>
#include <Servo.h>

#define LEFT_EAR_PIN 3
#define RIGHT_EAR_PIN 5
#define LEFT_PAW_PIN 6
#define SOUND_SENSOR_PIN 8
#define RIGHT_PAW_PIN 9
#define PLAYER_TX_PIN 11
#define PLAYER_RX_PIN 10

#define PLAYER_BAUD 9600
#define SERIAL_BAUD 19200

#define PLAYER_VOLUME 25
#define TRACKS 34
#define SOUND_IGNORE_TIME 200
#define CLAP_DELAY 1000

String command;
String lastCommand;

SoftwareSerial DFplayer(PLAYER_RX_PIN, PLAYER_TX_PIN);
DFRobotDFPlayerMini player;

// Ears
Servo leftEar;
Servo rightEar;
int earAngle;

void resetEars() {
  Serial.println("Resetting ears");

  earAngle = 0;
  leftEar.write(earAngle);
  rightEar.write(earAngle);
}

void raiseEars() {
  Serial.println("Raising ears");

  if (earAngle >= 90) {
    return;
  }

  earAngle += 180;
  leftEar.write(earAngle);
  rightEar.write(earAngle);
}

void lowerEars() {
  Serial.println("Lowering ears");

  if (earAngle <= 0) {
    return;
  }

  earAngle -= 180;
  leftEar.write(earAngle);
  rightEar.write(earAngle);
}

void flapEars() {
  Serial.println("Flapping ears");

  earAngle = 180 - earAngle;
  leftEar.write(earAngle);
  rightEar.write(earAngle);
}

// Paws
Servo leftPaw;
Servo rightPaw;
int leftPawAngle;
int leftPawIncrement;
int rightPawAngle;
int rightPawIncrement;

void resetPaws() {
  Serial.println("Resetting paws");

  leftPawAngle = 0;
  leftPawIncrement = 20;
  rightPawAngle = 0;
  rightPawIncrement = 20;
  leftPaw.write(leftPawAngle);
  rightPaw.write(rightPawAngle);
}

void shakePaw(Servo paw, int* currentAngle, int* increment) {
  Serial.println("Shaking a paw");

  if (*currentAngle >= 100 || (*currentAngle <= 0 && *increment < 0)) {
    *increment *= -1;
  }

  *currentAngle += *increment;
  paw.write(*currentAngle);
}

void resetAll() {
  Serial.println("Resetting all");
  resetPlayer();
  resetEars();
  resetPaws();
}

int claps = 0;
long lastClapTime = 0;

void detectClaps() {
  if (millis() - lastClapTime <= SOUND_IGNORE_TIME) {
    return;
  }

  if (digitalRead(SOUND_SENSOR_PIN) == 1) {
    claps++;
    
    if (claps == 2) {
      onDoubleClap();
      claps = 0;
    }
    
    lastClapTime = millis();
  }
  else {
    if (claps == 1 && millis() - lastClapTime > CLAP_DELAY) {
      onSingleClap();
      claps = 0;
      lastClapTime = millis();
    }
  }
}

boolean playerActive;
int track;

void startPlayer() {
  if (playerActive) {
    Serial.print("Track ");Serial.print(track);Serial.println(" is already playing");
    return;
  }

  Serial.print("Playing track "); Serial.println(track);
  player.play(track);
  playerActive = true;
}

void stopPlayer() {
  if (!playerActive) {
    Serial.print("Track ");Serial.print(track);Serial.println(" is already stopped");
    return;
  }

  Serial.print("Stopping track "); Serial.println(track);
  player.stop();
  playerActive = false;
}

void togglePlayer() {
  if (!playerActive) {
    startPlayer();
  } else {
    stopPlayer();
  }
}

void playTrack(int track) {
  Serial.print("Playing track "); Serial.println(track);

  if (playerActive) {
    playerActive = false;
    player.stop();
    delay(1000);
  }
  
  playerActive = true;
  player.play(track);
}

void changeTrack() {
  track++;

  if (track > TRACKS) {
    track = 1;
  }
  
  playTrack(track);
}

void onSingleClap() {
  Serial.println("Single Clap");
  togglePlayer();
}

void onDoubleClap() {
  Serial.println("Double Clap");
  changeTrack();
}

void resetPlayer() {
  Serial.println("Resetting player");
  playerActive = false;
  player.stop();
  track = 1;
}

void processCommands() {
  command = "";

  while (Serial.available()) {
    command += Serial.readString();
  }

  if (command == "") {
    command = lastCommand;
  }
  else {
    Serial.print("Received command: "); Serial.println(command);
  }

  if (!Serial.available()) {
    if (command != "") {
      if (command.equals("1")) {
        raiseEars();
        lastCommand = "";
      }
      else if (command.equals("2")) {
        lowerEars();
        lastCommand = "";
      }
      else if (command.equals("3")) {
        flapEars();
        lastCommand = "3";
      }
      else if (command.equals("4")) {
        shakePaw(leftPaw, &leftPawAngle, &leftPawIncrement);
        lastCommand = "4";
      }
      else if (command.equals("5")) {
        shakePaw(rightPaw, &rightPawAngle, &rightPawIncrement);
        lastCommand = "5";
      }
      else if (command.equals("6")) {
        startPlayer();
        lastCommand = "";
      }
      else if (command.equals("7")) {
        stopPlayer();
        lastCommand = "";
      }
      else if (command.equals("8")) {
        changeTrack();
        lastCommand = "";
      }
      else if (command.startsWith("P")) {
        track = command.substring(1).toInt();
        playTrack(track);
        lastCommand = "";
      }
      else if (command.equals("0")) {
        lastCommand = "";
        resetAll();
      }
      else {
        Serial.print("Unknown command: "); Serial.println(command);
      }

      delay(500);
    }
  }
}

void handlePlayerEvents() {
  if (!player.available()) {
    return;
  }

  uint8_t event = player.readType();
  
  switch (event) {
    case DFPlayerPlayFinished:
      playerActive = false;
      Serial.print("Stopping track "); Serial.println(track);
      break;
  }
}

void printDetail(uint8_t type, int value){
  switch (type) {
    case TimeOut:
      Serial.println(F("Time Out!"));
      break;
    case WrongStack:
      Serial.println(F("Stack Wrong!"));
      break;
    case DFPlayerCardInserted:
      Serial.println(F("Card Inserted!"));
      break;
    case DFPlayerCardRemoved:
      Serial.println(F("Card Removed!"));
      break;
    case DFPlayerCardOnline:
      Serial.println(F("Card Online!"));
      break;
    case DFPlayerUSBInserted:
      Serial.println("USB Inserted!");
      break;
    case DFPlayerUSBRemoved:
      Serial.println("USB Removed!");
      break;
    case DFPlayerPlayFinished:
      Serial.print(F("Number:"));
      Serial.print(value);
      Serial.println(F(" Play Finished!"));
      break;
    case DFPlayerError:
      Serial.print(F("DFPlayerError:"));
      switch (value) {
        case Busy:
          Serial.println(F("Card not found"));
          break;
        case Sleeping:
          Serial.println(F("Sleeping"));
          break;
        case SerialWrongStack:
          Serial.println(F("Get Wrong Stack"));
          break;
        case CheckSumNotMatch:
          Serial.println(F("Check Sum Not Match"));
          break;
        case FileIndexOut:
          Serial.println(F("File Index Out of Bound"));
          break;
        case FileMismatch:
          Serial.println(F("Cannot Find File"));
          break;
        case Advertise:
          Serial.println(F("In Advertise"));
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }
}

void setup() {
  command = "";
  lastCommand = "";
  playerActive = false;
  track = 1;
  lastClapTime = 0;

  pinMode(SOUND_SENSOR_PIN, INPUT);
  
  DFplayer.begin(PLAYER_BAUD);
  Serial.begin(SERIAL_BAUD);
  
  if (!player.begin(DFplayer)) {
    Serial.println("Unable to initialize player");
    while (true);
  }
  
  Serial.println("DFPlayer Mini is online");

  player.volume(PLAYER_VOLUME);

  leftEar.attach(LEFT_EAR_PIN);
  rightEar.attach(RIGHT_EAR_PIN);
  leftPaw.attach(LEFT_PAW_PIN);
  rightPaw.attach(RIGHT_PAW_PIN);

  resetAll();
}

void loop() {
  processCommands();
  detectClaps();
  handlePlayerEvents();
  
  /* FOR DEBUGGING PLAYER
  if (player.available()) {
    printDetail(player.readType(), player.read());
  }
  */
}
