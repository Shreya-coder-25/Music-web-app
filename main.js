leftWristX= 0;
leftWristY= 0;
rightWristX= 0;
rightWristY= 0;
song1= "";
song2= "";
score_leftWrist= 0;
score_rightWrist= 0;
song1_status="";
song2_status="";

function preload()
{
   song1= loadSound("music.mp3");
   song2= loadSound("music2.mp3");
}
function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}
function draw()
{
   image(video,0,0,600,500);
   fill("red");
   stroke("red");
   song1_status= song1.isPlaying();
   song2_status= song2.isPlaying();
   if(score_rightWrist > 0.2)
   {
       circle(rightWristX,rightWristY,20);
       song2.stop();
       if(song1_status == false)
       {
           song1.play();
           document.getElementById("song").innerHTML= "Playing SONG 1";
       }
   }
   if(score_leftWrist > 0.2)
   {
       circle(leftWristX,leftWristY,20);
       song1.stop();
       if(song2_status == false)
       {
           song2.play();
           document.getElementById("song").innerHTML= "Playing SONG 2";
       }
   }
}
function modelLoaded()
{
    console.log("PoseNet is Initialized");
}
function gotPoses(results)
{
    if(results > 0)
    {
        console.log(results);
        leftWristX= results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWristX.y;
        console.log("leftWristX= "+leftWristX+"leftWristY= "+leftWristY+ "score_leftwrist= "+score_leftWrist);
        score_leftWrist= results[0].pose.keypoints[9].score;

        rightWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;
        console.log("rightWristX= "+rightWristX+"rightWristY= "+rightWristY+ "score_rightwrist= "+score_rightWrist);
        score_rightWrist= results[0].pose.keypoints[10].score;
    }
}

