using Godot;
using System;

public class UI : Node
{
    private Controller _controller;

    private RichTextLabel _hashCount;
    private RichTextLabel _hashRate;

    // Called when the node enters the scene tree for the first time.
    public override void _Ready()
    {
        _controller = GetNode<Controller>("/root/World/Controller");
        _hashCount = GetNode<RichTextLabel>("HashCount");
        _hashRate = GetNode<RichTextLabel>("HashRate");
    }

    // Called every frame. 'delta' is the elapsed time since the previous frame.
    public override void _Process(float delta)
    {
        _hashCount.Text = $"Hash Count: {_controller.Hashes:0.00}";
        _hashRate.Text = $"Hash Rate: {_controller.HashRate:0.00}";
    }

    public void OnPressHashButton()
    {
        _controller.ManualHash();
    }
}
