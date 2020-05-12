import cv2

cam = cv2.VideoCapture(0)
fourcc = cv2.VideoWriter_fourcc(*'XVID')
out = cv2.VideoWriter('output.avi', fourcc, 20.0, (640,480))
print(cam.isOpened())
while(cam.isOpened()):
    ret, frame = cam.read()
    if ret == True:
        print(cam.get(cv2.CAP_PROP_FRAME_WIDTH))
        print(cam.get(cv2.CAP_PROP_FRAME_HEIGHT))

        out.write(frame)

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        cv2.imshow('frame', gray)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    else: 
        break
cam.release()
out.release()
cv2.destroyAllWindows()
# img = cv2.imread('Capture.jpg', 1)

# print(img)

# cv2.imshow('image', img)
# key = cv2.waitKey() & 0xFF

# if key == 27:
#     cv2.destroyAllWindows()
# elif key == ord('s'):
#     cv2.imwrite('Capture_copy.png', img)
#     cv2.destroyAllWindows()