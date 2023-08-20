# Cut Sonic (Audio Segmentation and Enhancement)

[English](https://github.com/usaginya/mkAppUpInfo/tree/master/python/cutsonic/README_EN.md)

This script is used to split audio files such as WAV, MP3, OGG, etc., and optionally perform basic denoising and speech enhancement. Its primary purpose is to quickly create speech datasets for AI training.


## Source

- The script is modified based on the project "[Voice-Segmentation-and-Enhancement](https://github.com/Reddragon300/Voice-Segmentation-and-Enhancement)" by Reddragon300.

- The denoising and speech enhancement solution references the code from the "[Audio_Enhancement](https://github.com/Mastering-Python-GT/Audio_Enhancement)" project by Mastering-Python-GT.


## How to Use

1. Install Python (if you haven't already).
2. Download `cutsonic.py` and `requirements.txt` and save them in a folder.
3. Navigate to the folder in your command prompt and run the command `pip install -r requirements.txt` to install the required packages.
4. Run the command `py cutsonic.py` and follow the prompts to start using the program.

- PS: If you make a mistake or want to terminate the program, you can press `Ctrl+C` to stop the execution.


## Other

If you are not satisfied with the noise reduction and enhancement effects, you can modify the effect parameters configuration within the script by locating the code snippet `self.__board__ = Pedalboard([...])` which is located within the first 20 lines.
You can easily find it.

For more information on effect configurations, please refer to the [official documentation of Pedalboard](https://spotify.github.io/pedalboard/index.html).

