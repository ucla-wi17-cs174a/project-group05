// Path

var pathWidth = 40;
var pathPoints = [];
var numPathVertices = 6;

// Generate vertices for the path
function generatePath()
{
    // Generate the path with z: { -cameraPositionZaxis, cameraPositionZaxis }
    // Store the vertices needed for the path
    var pathVertices =
    [
        vec4( -1 * pathWidth, 0, cameraPositionZAxis, 1.0 ),   // near left corner   // 0
        vec4( -1 * pathWidth, 0, -cameraPositionZAxis, 1.0 ),  // far left corner    // 1
        vec4( pathWidth, 0, -cameraPositionZAxis, 1.0 ),   // far right corner   // 2
        vec4( pathWidth, 0, cameraPositionZAxis, 1.0 )     // near right corner  // 3
    ];

    // The order to draw with the path vertices
    var vertexOrder = [1, 0, 3, 1, 3, 2];

    for (var i = 0; i < 6; i++) {
        pathPoints.push(pathVertices[vertexOrder[i]]);
    }
}

// Draw the path for the cubes to travel on
function drawPath(scrollAmount)
{
    // We don't need lighting on the path because it is LIT AF already
    gl.disableVertexAttribArray(vNormal);

    // Buffer and attributes for the path points
    gl.bindBuffer( gl.ARRAY_BUFFER, vPathBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pathPoints), gl.STATIC_DRAW );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    // Reset the camera transform matrix as well (was changed to move the cubes)
    // gl.uniformMatrix4fv(cameraTransformMatrixLoc, false, flatten(pathCameraTransformMatrix));

    // Enable the texture before we draw
    enableTexture = true;
    gl.uniform1f(enableTextureLoc, enableTexture);  // tell the shader whether or not we want to enable textures

    if (!isFlipped)
    {
         // Add scrolling rainbow road texture
         if (!isPaused)
         {
            // Don't grow forever
            if( !isMarioMode )
            {
                if( rainbowCoords[0][1] > 60 )
                {
                    rainbowCoords = [];
                    for( var i = 0; i < 6; i++ )
                    {
                        rainbowCoords.push(rainbowResetCoords[i]);
                    }
                }

                for( var v = 0; v < 6; v++ )
                {
                    rainbowCoords[ v ] = add( rainbowCoords[ v ], vec2( 0, scrollAmount ));
                }
            }
            else
            {
                if( grassCoords[0][1] > 60 )
                {
                    grassCoords = [];
                    for( var i = 0; i < 6; i++ )
                    {
                        grassCoords.push(grassResetCoords[i]);
                    }
                }

                for( var v = 0; v < 6; v++ )
                {
                    grassCoords[ v ] = add( grassCoords[ v ], vec2( 0, scrollAmount ));
                }
            }
        }

        if (isMarioMode)
        {
            applyScrollingTexture(grassCoords);
        }
        else
        {
            applyScrollingTexture(rainbowCoords);
        }
    }
    else
    {
        if (isMarioMode)
        {
            applyScrollingTexture(grassCoords);
        }
        else
        {
            applyRepeatingTexture(flippedRainbowCoords);
        }
    }

    // Reset the model transform matrix so the path is drawn at the origin
    modelTransformMatrix = mat4();
    // Add in rotation due to left/right keypress
    // modelTransformMatrix = mult( modelTransformMatrix, rotate( rotDegrees, vec3( 0, 0, 1 )));
    gl.uniformMatrix4fv(modelTransformMatrixLoc, false, flatten(modelTransformMatrix));

    gl.drawArrays( gl.TRIANGLES, 0, numPathVertices );

    // Set the model transform back to its original value
    gl.uniformMatrix4fv(modelTransformMatrixLoc, false, flatten(modelTransformMatrix));

     // disable the texture before we draw something else later
    enableTexture = false;
    gl.uniform1f(enableTextureLoc, enableTexture);
}
