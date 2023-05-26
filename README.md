# Escape-Velocity
An HTML5 implementation of the 90's Mac shareware classic Escape Velocity.

_Please note: All graphics, audio and story elements are not licenenced and are copyright to Ambrosia Software and/or Matt Burch, and any others which form the stakeholder parties of the original software. This is a demonstration of the engine for use during development of the underlying software and therefore such elements serve as placeholders. No permission is given to copy any part of the software contained within without the permission of the aforementioned parties._

## Introduction

## Research

### MacOS and Resource Forks

Mac Resource forks are the data structures used to contain the internal information which constitute any file found in classic Mac OS systems. This can be anything from the code itself, the dialog layouts, sounds, graphics, Finer icons and anything the programmer decides to place within. Resource forks provided a simple and visual way to create and organise the assets needed to make visual programs, software such as ResEdit was used create and modify resource forks as the programmer or user required. This also means Mac OS is extremely flexible in the customisation of how a file may be represented. Escape Velocity used six core resource forks and any number of plug-in files (also resource forks):
1. _Escape Velocity_ is the application itself, containing the code, dialogs, registration data, and everything else the application requires which is not contained within the following forks.
2. _EV Data_ contains the application data; containing the missions, various entities (for example Ships, Systems, Planets, Fleets, NPCs, etc.).
3. _EV Sounds_ contains the gameplay audio components, such as weapon sounds and GUI sounds.
4. _EV Music_ contains the musical components, intro and credits music, these all have longer play times per resource than sounds.
5. _EV Graphics_ contains The sprites used within the game. This is for the ships, planets and other non-block visual game elements
6. _EV Titles_ contains large format static images such as splash screens and planet landing dialog images.
7. _Plug ins_ are resource forks contained within the plug-ins folder which extend the gameplay
When Escape Velocity was started, each of the resource forks would be loaded to a single representative fork which the game would use to provide the gaming experience to the user. After the main forks were loaded, the plug-ins were loaded, which may override the original game fork entities to create a completely customisable experience

__Loading Resource Forks__

Resource forks can be loaded by using the Kaitai toolset:
- [KaitaiStream.js](https://doc.kaitai.io/stream_api.html) - Creates a stream-like object which to tools may use to read the data
- [ResourceFork.js](https://formats.kaitai.io/resource_fork/) - Creates a fork object to access the data
- [BytesWithIo.js](https://formats.kaitai.io/bytes_with_io/javascript.html) - Allows access to the data as byte data

To then parse the forks into a useful data type inline with javascript objects, a library has been developed
- [MacResource.js]() - A class which wraps the Kaitai tools then loads and parses the resource in a heirarchal tree similar to the layout found in a resource explorer.
- [forkTmpl.json]() - The template resource (TMPL) taken from the ResEdit app, containing the templates to the base/standard resource types found on a classic Mac OS system.
- [MacQuirks.js]() - Intended to map between the slight quirks of a classic Mac OS System to the a modern system, this mainly ended up being a conversion between the extended opcodes used in old macintosh encodings (I.E ASCII ends at opcode 127, however mac used the entire byte for an extended set, pre unicode), for example umlat e (ë) is converted to standard e (e).

This gives access to the more useful portions of information required to start development, such as the data structures the game uses to provide the gaming experience, we can ignore less useful resources which will have to be reimplemented in web technologies (for example, dialog and program code), with the exception of image and audio data

__Loading Audio__

Audio resources in Escape Velocity is stored as a 8 bit signed monophonic PCM stream with a sample rate of 11025 Hz (With exception of the main theme at 22050 Hz)

__Loading Images__

Images are stored as a PICT resource containing 256 colour images in a bitmap type format, and while there may be some method to read these resources much of this has been lost (at least from a compound resource fork perspective), instead images have been extracted using a classic MacOS emulator (in this case the [Infinite Mac implementation of Mac OS 8](https://macos8.app)) was used to open the _EV Graphics_ and _EV Titles_ resource forks in ResEdit, copy the required resources across to Adobe Photoshop, then saved to GIF format before being extracted. GIF format was chosen as it is a web based format which was available in the Photoshop version available on the Infinite Mac implementation while also preserving the bitmap of the original image, meaning there was a minimal data loss in the conversion. This, in turn, means PICT resources must be replaced by links to images which are loaded separately, or some other method, until a way to natively parse to a web format can be discovered/implemented. This means in the future if plug ins are supported, they too must be stripped of images for them to work properly.

