import h5py

weights_path = "model.weights.h5"

with h5py.File(weights_path, "r") as f:
    print("🔍 Layer groups inside weights file:")
    for layer_name in f.keys():
        print(" -", layer_name)
