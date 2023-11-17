using Godot;
using System;

public class Controller : Node
{
    // Declare member variables here. Examples:
    // private int a = 2;
    // private string b = "text";

    public float HashRate
    {
        get
        {
            return _hashRate;
        }
    }

    public float ManualHashRate
    {
        get
        {
            return _manualHashRate;
        }
    }

    public float Hashes
    {
        get
        {
            return _hashes;
        }
    }

    // We want to call this every frame so don't dynamically
    // recalc - instead, change on changes and keep a value
    private float _hashRate = 0;

    private float _manualHashRate = 1;

    private float _hashes = 0;

    public void ManualHash()
    {
        _hashes += ManualHashRate;
    }

    // Called when the node enters the scene tree for the first time.
    public override void _Ready()
    {
        // load values from storage in future?
    }

    // Called every frame. 'delta' is the elapsed time since the previous frame.
    public override void _Process(float delta)
    {
        _hashes += HashRate * delta;
    }
}
