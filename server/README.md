# Backend

 1. create a virtual env. 
   - python3 -m venv myvenv  
 2. run your venv
   - source myvenv/bin/activate
 3. install requiremnts
   - pip install -r requirements.txt 


# Working samples
- https://www.youtube.com/shorts/we=8L3_eh5X_fk
- https://www.youtube.com/?v=eXYYTMxB5RA

# To do:
- everytime we complete a detection, we will erase the /temp folder and its frames, so we can make a new prediction
# Pose Detection Concerns/Complications
- Resolution:
  - padding on tiktok videos might confuse the ml model. 
  - do we need to deal with different paddings?     
- Repeated pose detection? 
  - too many repeats could be a concern because the same frame might repeat again, so we will have many duplicates.
    - what should we do?

