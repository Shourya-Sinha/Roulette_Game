import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

const Roulette = () => {
  const canvasRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);

  // Default values
  const defaultNames = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const defaultYesNo = [
    "Yes",
    "No",
    "Yes",
    "No",
    "Yes",
    "No",
    "Yes",
    "No",
    "Yes",
    "No",
  ];
  const defaultCity = [
    "Patna",
    "Banglore",
    "Chennai",
    "Mumbai",
    "New Delhi",
    "ChandiGadh",
    "Kolkata",
    "Pune",
    "Surat",
    "Jaipur",
  ];
  const animals = [
    "🐕 Dog",
    "🐈 Cat",
    "🐁 Mouse",
    "🐹 Hamster",
    "🐇 Rabbit",
    "🦊 Fox",
    "🐻 Bear",
    "🐼 Panda",
    "🐨 Koala",
    "🐯 Tiger",
    "🦁 Lion",
    "🐄 Cattle",
    "🐖 Pig",
    "🐸 Frog",
    "🐒 Monkey",
    "🦄 Unicorn",
    "🐔 Chicken",
    "🐧 Penguin",
    "🐦 Bird",
    "🐤 Chick",
    "🐣 Broken shell chicks",
    "🦆 Duck",
    "🦅 Hawk",
    "🦉 Owl",
    "🦇 Bat",
    "🐺 Wolf",
    "🐗 Wild boar",
    "🐴 Horse",
    "🐝 Bee",
    "🐛 Caterpillar",
    "🦋 Butterfly",
    "🐌 Snail",
    "🐞 Ladybug",
    "🐜 Ant",
    "🕷️ Spider",
    "🦂 Scorpion",
    "🐢 Turtles",
    "🐍 Snake",
    "🦎 Lizard",
    "🦖 Tyrannosaurus rex",
    "🦕 Long-necked dragon",
    "🐙 Octopus",
    "🦑 Squid",
    "🦀 Crab",
    "🐡 Blowfish",
    "🐠 Tropical fish",
    "🐟 Fish",
    "🐬 Dolphin",
    "🐳 Whale",
    "🐋 Whale",
    "🦈 Shark",
    "🐊 Alligator",
    "🐆 Leopard",
    "🐅 Tiger",
    "🐃 Buffalo",
    "🐂 Bull",
    "🐄 Dairy cattle",
    "🐪 Camel",
    "🐫 Bactrian camel",
    "🦙 Alpaca",
    "🦒 Giraffe",
    "🐘 Elephant",
    "🦏 Rhinoceros",
    "🦛 Hippopotamus",
    "🐁 Mouse",
    "🐀 Mouse",
    "🐿️ Chipmunk",
    "🦔 Hedgehog",
  ];

  const emotions = [
    "😀 Smiley",
    "😁 Grinning",
    "😂 Laughing",
    "🤣 Rolling on the floor laughing",
    "😊 Smiling",
    "😇 Angel",
    "🥰 Heart eyes",
    "😍 Heart eyes",
    "😘 Kissing",
    "😋 Delicious",
    "😛 Tongue out",
    "😜 Winking",
    "🤪 Crazy",
    "😝 Squinting",
    "🤑 Money",
    "🤗 Hugging",
    "🤔 Thinking",
    "🤨 Raised eyebrow",
    "😐 Neutral",
    "😑 Expressionless",
    "😏 Smug",
    "😒 Unamused",
    "🙄 Rolling eyes",
    "😬 Grimacing",
    "🤥 Lying",
    "😌 Relieved",
    "😔 Pensive",
    "🤤 Drooling",
    "😴 Sleeping",
    "😷 Masked",
    "🤒 Sick",
    "🤢 Nauseated",
    "🤮 Vomiting",
    "🤧 Sneezing",
    "🥵 Hot",
    "🥶 Cold",
    "🥴 Dizzy",
    "😵 Dazed",
    "🤯 Exploding head",
    "🤠 Cowboy",
    "🥳 Partying",
    "😎 Cool",
    "🤓 Nerdy",
    "🧐 Monocle",
    "😕 Confused",
    "😟 Worried",
    "🙁 Frowning",
    "☹️ Sad",
    "😮 Surprised",
    "😲 Astonished",
    "😳 Flushed",
    "🥺 Pleading",
    "😨 Fearful",
    "😰 Anxious",
    "😢 Crying",
    "😭 Loudly crying",
    "😱 Screaming",
    "😖 Confounded",
    "😞 Disappointed",
    "😩 Weary",
    "😫 Tired",
    "🥱 Yawning",
    "😤 Angry",
    "😡 Enraged",
    "😠 Annoyed",
  ];

  const objects = [
    "A book",
    "Red stuff",
    "A coin",
    "A piece of jewelry",
    "Kitchen utensils",
    "A photo",
    "A key",
    "Blue stuff",
    "A pen",
    "A notebook",
    "A piece of clothing",
    "A shoe",
    "A toy",
    "A package",
    "A remote control",
    "A plant",
    "A pillow",
    "A cup",
  ];
  const musicGenres = [
    "Rock",
    "Hip hop",
    "Rustic",
    "Sir",
    "Classical",
    "R&B",
    "Electron",
    "Reggaeton",
    "Bruce",
    "Ballad",
    "Metal",
    "Disco",
  ];

  const activities = [
    "Study",
    "Watch a movie",
    "Walk",
    "Exercise",
    "Try new recipes",
    "Listen to music",
    "Try a new hobby",
    "Visit the museum",
    "Shopping",
    "Call a friend",
    "Play the game",
    "Jigsaw puzzle",
    "Meditation",
    "Horticulture",
    "Clean or tidy",
    "Keep a journal",
    "Learn new skills",
    "Draw or paint",
    "Nap",
    "Go to the beach",
  ];
  const desserts = [
    "🍦Ice Cream" ,
    "🍧Shaved Ice",
    "🍨Sundae",
    "🍩Donut",
    "🍪Cookie",
    "🎂Cake",
    "🍰Slice of Cake",
    "🧁Cupcake",
    "🥧Pie",
    "🍫Chocolate",
    "🍬Candy",
    "🍭Lollipop",
    "🍮Pudding",
    "🍯Honey",
  ];

  // Load from localStorage if available, otherwise use default
  const [selectedFeature, setSelectedFeature] = useState(() => {
    const savedFeature = localStorage.getItem("selectedFeature");
    return savedFeature ? JSON.parse(savedFeature) : defaultNames;
  });

  const [editedFields, setEditedFields] = useState(() => {
    const savedEditedFields = localStorage.getItem("editedFields");
    return savedEditedFields ? JSON.parse(savedEditedFields) : [];
  });

const colors = [
    "#FF5733", "#33FF57", "#3357FF", "#F0FF33", "#FF33A2", "#33FFF2", "#FF5733",
    "#33FF57", "#3357FF", "#F0FF33", "#FF33A2", "#33FFF2", "#FF5733", "#33FF57",
    "#3357FF", "#F0FF33", "#FF33A2", "#33FFF2", "#FF5733", "#33FF57", "#3357FF",
    "#F0FF33", "#FF33A2", "#33FFF2", "#FF5733", "#33FF57", "#3357FF", "#F0FF33",
    "#FF33A2", "#33FFF2", "#FF5733", "#33FF57", "#3357FF", "#F0FF33", "#FF33A2",
    "#33FFF2", "#FF5733", "#33FF57", "#3357FF", "#F0FF33", "#FF33A2", "#33FFF2",
    "#FF5733", "#33FF57", "#3357FF", "#F0FF33", "#FF33A2", "#33FFF2", "#FF5733",
    "#33FF57", "#3357FF", "#F0FF33", "#FF33A2", "#33FFF2", "#FF5733", "#33FF57",
    "#3357FF", "#F0FF33", "#FF33A2", "#33FFF2", "#FF5733", "#33FF57", "#3357FF",
    "#F0FF33", "#FF33A2", "#33FFF2", "#FF5733", "#33FF57", "#3357FF", "#F0FF33",
  ];

  

  // Save to localStorage whenever selectedFeature or editedFields change
  useEffect(() => {
    localStorage.setItem("selectedFeature", JSON.stringify(selectedFeature));
    localStorage.setItem("editedFields", JSON.stringify(editedFields));
    drawWheel();
  }, [selectedFeature, rotation, editedFields]);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const segments = selectedFeature.length;
    const angleStep = (2 * Math.PI) / segments;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    selectedFeature.forEach((name, index) => {
      const angle = index * angleStep;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, canvas.height / 2);
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2,
        angle,
        angle + angleStep
      );
      ctx.fillStyle = colors[index];
      ctx.fill();
      ctx.stroke();

      // Draw the text
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(angle + angleStep / 2);
      ctx.textAlign = "center";
      ctx.fillStyle = "#000";
      ctx.font = "15px Roboto";
      ctx.fillText(name, canvas.width / 3, 6);
      ctx.restore();
    });
  };

  const spinWheel = () => {
    if (spinning) return;

    setSpinning(true);
    const randomDegree = Math.floor(Math.random() * 360) + 3600; // Random between 3600 and 7200 degrees
    setRotation(rotation + randomDegree);

    setTimeout(() => {
      setSpinning(false);
    }, 10000); // 10 seconds for animation
  };

  const handleFeatureChange = (feature) => {
    let newFeature = defaultNames;
    switch (feature) {
      case "Default":
        newFeature = defaultNames;
        break;
      case "Yes/No":
        newFeature = defaultYesNo;
        break;
      case "City":
        newFeature = defaultCity;
        break;
      case "Adnimals":
        newFeature = animals;
        break;
      case "Emoji":
        newFeature = emotions;
        break;
      case "Music":
        newFeature = musicGenres;
        break;
      case "Activity":
        newFeature = activities;
        break;
      case "Object":
        newFeature = objects;
        break;
      case "Deserts":
        newFeature = desserts;
        break;
      default:
        newFeature = defaultNames;
    }
    setSelectedFeature(newFeature);
    setEditedFields([]); // Reset edited fields
  };

  const handleEditChange = (index, value) => {
    const newFeature = [...selectedFeature];
    newFeature[index] = value;
    setSelectedFeature(newFeature);

    if (!editedFields.includes(index)) {
      setEditedFields([...editedFields, index]);
    }
  };

  const handleReset = () => {
    setSelectedFeature(defaultNames);
    setEditedFields([]);
  };

  return (
    <>
      <Container xl>
        <Box sx={{ display: "flex", flexDirection: "column", marginTop: 5 }}>
          <Typography variant="h4">Welcome to the Roulette Game!</Typography>

          <Typography style={{ marginY: 2 }} variant="h6">
            Wheel of Random draws
          </Typography>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 5,
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "540px",
                    height: "540px",
                  }}
                >
                  <canvas
                    ref={canvasRef}
                    width={540}
                    height={540}
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      transition: "transform 10s cubic-bezier(0.6, 0, 0, 1)",
                    }}
                  />
                  <div
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      top: "52%",
                      right: "0px", // Position slightly outside the canvas on the right side
                      width: 0,
                      height: 0,
                      borderLeft: "20px solid transparent",
                      borderRight: "20px solid transparent",
                      borderTop: "40px solid red", // Triangle pointing to the left
                      transform: "translateY(-50%) rotate(90deg)", // Rotate the indicator to point to the canvas
                      zIndex: 100,
                    }}
                  ></div>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} xl={5}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 9,
                }}
              >
                <Stack direction={"row"} spacing={2} sx={{ marginY: 3 }}>
                  <Button
                    onClick={spinWheel}
                    disabled={spinning}
                    variant="contained"
                    sx={{
                      paddingY: "4px",
                      paddingX: "13px",
                      backgroundColor: "#272a31",
                    }}
                  >
                    {spinning ? "Spinning..." : "Spin"}
                  </Button>
                  <Button
                    onClick={handleReset}
                    variant="contained"
                    sx={{
                      paddingY: "4px",
                      paddingX: "13px",
                      backgroundColor: "#ba000d",
                    }}
                  >
                    Reset to Default
                  </Button>
                </Stack>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#fff",
                    padding: 3,
                    borderRadius: 2,
                  }}
                >
                  <Grid container spacing={2}>
                    {selectedFeature.map((key, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <TextField
                          value={key}
                          onChange={(e) =>
                            handleEditChange(index, e.target.value)
                          }
                          
                          variant="outlined"
                          fullWidth
                          InputProps={{
                            style: {
                              textAlign: "center",
                              backgroundColor: editedFields.includes(index)
                                ? "#e0f7fa" // Highlight edited fields
                                : "white",
                            },
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                border: 'none', // Removes the border
                              },
                              '&:hover fieldset': {
                                border: 'none', // Removes the border on hover
                              },
                              '&.Mui-focused fieldset': {
                                border: 'none', // Removes the border when focused
                              },
                            },
                            '& .MuiInputBase-input': {
                              padding: 0, // Removes the padding inside the input
                            },
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ marginX: 5, marginTop: 5 }}>
            <Stack direction={"row"} spacing={2} sx={{ marginY: 3 }}>
              <Button
                variant="outlined"
                onClick={() => handleFeatureChange("Default")}
                sx={{
                  paddingY: "4px",
                  paddingX: "13px",
                }}
              >
                Default
              </Button>

              <Button
                variant="outlined"
                onClick={() => handleFeatureChange("Yes/No")}
                sx={{
                  paddingY: "4px",
                  paddingX: "13px",
                }}
              >
                Yes/No
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleFeatureChange("City")}
                sx={{
                  paddingY: "4px",
                  paddingX: "13px",
                }}
              >
                City
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleFeatureChange("Adnimals")}
                sx={{
                  paddingY: "4px",
                  paddingX: "13px",
                }}
              >
                Adnimals
              </Button>

              <Button
                variant="outlined"
                onClick={() => handleFeatureChange("Emoji")}
                sx={{
                  paddingY: "4px",
                  paddingX: "13px",
                }}
              >
                Emojies
              </Button>

              <Button
                variant="outlined"
                onClick={() => handleFeatureChange("Music")}
                sx={{
                  paddingY: "4px",
                  paddingX: "13px",
                }}
              >
                Music
              </Button>

              <Button
                variant="outlined"
                onClick={() => handleFeatureChange("Activity")}
                sx={{
                  paddingY: "4px",
                  paddingX: "13px",
                }}
              >
                Activity
              </Button>

              <Button
                variant="outlined"
                onClick={() => handleFeatureChange("Deserts")}
                sx={{
                  paddingY: "4px",
                  paddingX: "13px",
                }}
              >
                Deserts
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleFeatureChange("Object")}
                sx={{
                  paddingY: "4px",
                  paddingX: "13px",
                }}
              >
                Object
              </Button>
            </Stack>
          </Box>
          <Box sx={{ marginX: 3, marginY: 2 }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontSize: 13,
                fontWeight: 600,
                textTransform: "capitalize",
                textAlign: "justify",
                color: "#595959",
              }}
            >
              It is an online tool that randomly selects a name or item. It is
              also known as a random name picker, name wheel, or online
              roulette. Sometimes, people have a hard time making decisions.
              Then make a list of existing options or candidates, and then
              randomly choose one from them. In this case, you can use our tool
              to make a decision. Simple and fun. You can modify the names in
              the textarea to place one name per line. These names will be drawn
              on circles. Just tap on the wheel and it will start spinning for a
              few seconds. The result is a name in a randomly selected list. If
              you're using your desktop, we also provide handy shortcuts. What
              happens when you start spinning (clicking)? The program on this
              page will generate a true random number via the native JavaScript
              API and calculate this number to point to one of the names. Then
              the wheel starts to rotate using the CSS3-2D method.
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Roulette;
