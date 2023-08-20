from pydub import AudioSegment
from pydub.silence import split_on_silence
from pedalboard.io import AudioFile
from pedalboard import *
import noisereduce as nr
import io
import os
import sys


class AudioProcessor:

    def __init__(self, audio_file, output_directory):
        self.audio_file = audio_file
        self.output_directory = output_directory
        self.__board__ = Pedalboard([
            NoiseGate(threshold_db=-40, ratio=3, release_ms=250),
            Compressor(threshold_db=-18, ratio=3),
            LowShelfFilter(cutoff_frequency_hz=400, gain_db=1, q=1),
            LowShelfFilter(cutoff_frequency_hz=8600, gain_db=1, q=1),
            Limiter(threshold_db=-6),
            Gain(gain_db=-1.2)
        ])

    def process_audio(self, min_sentence_duration=1000, silence_threshold=-40, enhanced=True, sample_rate=44100, channels=1, output_format="wav"):
        try:
            # Load the audio file
            audio = AudioSegment.from_file(self.audio_file)

            # Convert to the specified sample rate and channels for better noise reduction
            audio = audio.set_frame_rate(sample_rate).set_channels(channels)

            # Split the audio by silence into sentences or words
            audio_segments = self.split_audio(audio, min_sentence_duration, silence_threshold)

            # Export audio segments
            if enhanced:
                # Enhance volume and clarity if enabled
                audio_segments = self.export_enhance_segments(audio_segments, output_format)
            else:
                # Export the native audio segments
                self.export_segments(audio_segments, output_format)

            print(f"音频文件: {self.audio_file} 处理完成.")

        except FileNotFoundError:
            print(f"未找到音频文件: {self.audio_file} , 请检查路径.")

        except Exception as e:
            print(f"处理音频文件出错: {str(e)}")

    def split_audio(self, audio, min_sentence_duration, silence_threshold):
        audio_segments = split_on_silence(audio, min_silence_len=min_sentence_duration, silence_thresh=silence_threshold)
        return audio_segments

    def get_output_file_name(self, i, output_format):
        origin_filename = os.path.splitext(os.path.basename(self.audio_file))[0]
        output_file = f"{self.output_directory}/{origin_filename}_clip_{i}.{output_format}"
        return output_file

    def export_enhance_segments(self, segments, output_format):
        for i, segment in enumerate(segments):
            sample_rate = segment.frame_rate

            with io.BytesIO() as inmemoryfile:
                segment.export(inmemoryfile, format=output_format)
                with AudioFile(inmemoryfile).resampled_to(sample_rate) as f:
                    audio = f.read(f.frames)

            reduced_noise = nr.reduce_noise(y=audio, sr=sample_rate, stationary=True, prop_decrease=0.76)
            enhanced_audio = self.__board__(reduced_noise, sample_rate=sample_rate)

            output_file = self.get_output_file_name(i, output_format)
            with AudioFile(output_file, 'w', sample_rate, enhanced_audio.shape[0]) as f:
                f.write(enhanced_audio)

    def export_segments(self, segments, output_format):
        for i, segment in enumerate(segments):
            output_file = self.get_output_file_name(i, output_format)
            segment.export(output_file, format=output_format)


def check_directory(directory_path):
    return os.path.exists(directory_path) and os.path.isdir(directory_path)


def get_audio_files(directory_path):
    # Get the file paths of all audio files with the extensions .mp3, .wav, and .org in the directory
    audio_extensions = ['.mp3', '.wav', '.ogg']
    audio_files = []

    for root, dirs, files in os.walk(directory_path):
        for file in files:
            if any(file.lower().endswith(ext) for ext in audio_extensions):
                audio_files.append(os.path.join(root, file))

    return audio_files


if __name__ == "__main__":
    try:
        input_directory = input("输入音频文件目录路径: ")
        if not check_directory(input_directory):
            print("\n输入的目录不存在")
            sys.exit(0)

        output_directory = input("输入处理完成保存音频文件的目录路径: ")

        use_default_settings = input("是否使用默认设置? (y/n): ")
        if use_default_settings.lower() == "n":
            min_sentence_duration = int(input("输入以毫秒为单位的最短持续时间 (比如, 1000): "))
            silence_threshold = int(input("输入静音阈值 dB (比如, -40): "))
            enhanced_input = input("是否启用增强并降噪? (y/n): ")
            if enhanced_input.lower() == "y":
                enhanced = True
                sample_rate = int(input("输入所需的采样率 Hz (比如, 44100): "))
                channels = int(input("输入声道数量 (比如, 1 为单声道): "))
            else:
                enhanced = False
                sample_rate = 44100  # Default sample rate
                channels = 1  # Default number of channels
            output_format = input("输入输出音频文件的格式 (比如, wav): ")
        else:
            min_sentence_duration = 1000  # Default minimum sentence duration
            silence_threshold = -40  # Default silence threshold
            enhanced = True  # Default noise reduction setting
            sample_rate = 44100  # Default sample rate
            channels = 1  # Default number of channels
            output_format = "wav"  # Default output file format

        # Create the output directory if it doesn't exist
        if not os.path.exists(output_directory):
            os.makedirs(output_directory)

        # Start working
        print("\n开始处理音频.... 请耐心等待完成....")
        audio_files = get_audio_files(input_directory)
        audio_count = len(audio_files)
        completed_count = 0

        if not audio_files:
            print("\n目录中没有找到符合条件的音频文件 (mp3/wav/ogg)")
            sys.exit(0)

        for audio_file in audio_files:
            completed_count += 1
            print(f"\n处理进度: {completed_count} / {audio_count}")
            # Create an instance of AudioProcessor
            audio_processor = AudioProcessor(audio_file, output_directory)
            # Process the audio
            audio_processor.process_audio(min_sentence_duration, silence_threshold, enhanced, sample_rate, channels, output_format)

        print("\n\n已处理完所有音频!")
        sys.exit(0)

    except ValueError:
        print("\n输入无效。请为参数输入有效的整数值。")
    except KeyboardInterrupt:
        print("\n程序执行中断。再次按 Ctrl+C 确认取消。")

    try:
        while True:
            key_press = input()
            if key_press == '\x03':  # Ctrl+C
                print("\n收到确认。音频处理已取消。")
                sys.exit(0)
    except KeyboardInterrupt:
        print("\n用户取消了音频处理。")
        sys.exit(0)
